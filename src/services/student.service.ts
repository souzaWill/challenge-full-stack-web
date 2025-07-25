import { Student, Prisma } from '@prisma/client';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { prisma } from '../lib/prisma';
import { CreateStudentInput, updateStudentSchema } from '../schemas/studentSchema';
import { hashPassword } from '../utils/hashPassword';

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function getAll(
  page = 1,
  limit = 10,
  sortField: string,
  sortDirection: 'asc' | 'desc',
  search: string | null,
): Promise<PaginatedResult<any>> {
  const skip = (page - 1) * limit;
  let orderBy: any;

  if (sortField === 'user.name') {
    orderBy = { user: { name: sortDirection } };
  } else if (sortField === 'user.email') {
    orderBy = { user: { email: sortDirection } };
  } else {
    orderBy = { [sortField]: sortDirection };
  }

  const where: Prisma.StudentWhereInput = search
    ? {
        user: {
          name: {
            contains: search,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.student.findMany({
      skip,
      take: limit,
      orderBy,
      where,
      include: {
        user: true,
      },
    }),
    prisma.student.count(),
  ]);

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function create(data: CreateStudentInput): Promise<Student> {
  return await prisma.student.create({
    data: {
      document: data.document,
      user: {
        create: {
          name: data.user.name,
          email: data.user.email,
          password: await hashPassword(data.document),
        },
      },
    },
    include: {
      user: true,
    },
  });
}

export async function edit(id: string, data: updateStudentSchema) {
  const { user } = data;

  return prisma.student.update({
    where: {
      id: id,
    },
    data: {
      user: {
        update: {
          name: user.name,
          email: user.email,
        },
      },
    },
    include: {
      user: true,
    },
  });
}

export async function get(id: string): Promise<Student | null> {
  return prisma.student.findUnique({
    where: { id },
    include: { user: true },
  });
}

export async function deleteByID(id: string) {
  await prisma.$transaction(async (transaction) => {
    const student = await transaction.student.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!student) throw new UnprocessableEntity();

    await transaction.student.delete({ where: { id } });
    await transaction.user.delete({ where: { id: student.userId } });
  });
}
