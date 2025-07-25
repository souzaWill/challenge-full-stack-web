import { z } from 'zod';
import { isValidCPF } from '../utils/validators';

const cpfRegex = /^\d{11}$/;

export const createStudentSchema = z.object({
  document: z
    .string()
    .regex(cpfRegex, 'CPF deve conter 11 dígitos numéricos')
    .refine(isValidCPF, { message: 'CPF inválido' }),

  user: z.object({
    name: z
      .string()
      .min(2, 'O nome deve ter ao menos 2 caracteres')
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, 'O nome só pode conter letras e espaços'),

    email: z.email('E-mail inválido'),
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
