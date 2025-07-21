import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';
import { JWT_SECRET, SALT_ROUNDS } from '../config/env';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { EmailAlreadyExistsError } from '../errors/EmailAlreadyExistsError';

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, password: true, name: true },
  });
  if (!user) throw new UnauthorizedError('invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new UnauthorizedError('invalid credentials');

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  return { token, user: { id: user.id, email: user.email, name: user.name } };
}

export async function register(name: string, email: string, password: string) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new EmailAlreadyExistsError();

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { id: user.id, email: user.email, name: user.name };
}
