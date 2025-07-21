import { prisma } from '../lib/prisma';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env';
import { Student } from '../../generated/prisma';
import { hashPassword } from '../utils/hashPassword';

beforeAll(async () => {
  await prisma.$connect();
});

beforeEach(async () => {
  await prisma.student.deleteMany();
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.$disconnect();
});

export async function createTestUser(overrides?: Partial<{ email: string; password: string }>) {
  const password = overrides?.password || faker.internet.password();
  const email = overrides?.email || `testuser+${faker.string.uuid()}@example.com`;

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name: faker.person.fullName(),
      email,
      password: hashedPassword,
    },
  });

  return { user, email, password, hashedPassword };
}

export async function createTestStudent(student: {
  document: string;
  user: { name: string; email: string };
}): Promise<Student> {
  return await prisma.student.create({
    data: {
      document: student.document,
      user: {
        create: {
          name: student.user.name,
          email: student.user.email,
          password: await hashPassword(student.document),
        },
      },
    },
    include: {
      user: true,
    },
  });
}

export async function generateTestToken() {
  const { user } = await createTestUser();

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
    expiresIn: '1h',
  });
  return { token };
}
