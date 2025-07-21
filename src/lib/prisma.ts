import { PrismaClient } from '../../generated/prisma';
// import dotenv from 'dotenv'

// dotenv.config({
//   path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
// }) TODO

export const prisma = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});
