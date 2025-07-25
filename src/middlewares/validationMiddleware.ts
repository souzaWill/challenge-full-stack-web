import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

export function validateData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          errors: error.issues.map((e) => ({ field: e.path.join('.'), message: e.message })),
          message: 'Requisição invalida',
        });
      }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
      });
    }
  };
}
