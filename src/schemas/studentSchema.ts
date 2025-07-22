import { z } from 'zod';

export const createStudentSchema = z.object({
  document: z.string().min(5),
  user: z.object({
    name: z.string().min(1),
    email: z.email(),
  }),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;

export const updateStudentSchema = z.object({
  user: z.object({
    name: z.string().min(1),
    email: z.email(),
  }),
});

export type updateStudentSchema = z.infer<typeof updateStudentSchema>;
