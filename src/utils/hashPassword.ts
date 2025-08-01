import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../config/env';

export async function hashPassword(plainText: string): Promise<string> {
  return bcrypt.hash(plainText, SALT_ROUNDS);
}
