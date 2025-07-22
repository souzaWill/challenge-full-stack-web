import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { JWT_SECRET } from '../config/env';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError';
import { hashPassword } from '../utils/hashPassword';
import bcrypt from 'bcrypt';
import { LoginInput, RegisterInput } from '../schemas/authSchema';

export async function login({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true, name: true },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new UnauthorizedError('invalid credentials');
  }

  const token = generateToken(user.id);
  
  return { token, user: { id: user.id, email: user.email, name: user.name } };
}

export async function register({ name, email, password }: RegisterInput) {

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new EmailAlreadyExistsError();

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { id: user.id, email: user.email, name: user.name };
}

function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
}
