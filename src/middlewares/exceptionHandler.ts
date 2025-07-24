import { Request, Response, NextFunction } from 'express';
import { IBaseError } from '../errors/IBaseError';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';

export const exceptionHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR;
  let message: string = ReasonPhrases.INTERNAL_SERVER_ERROR;

  if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
    const target = error.meta?.target as string[] | undefined;
    const field = target?.[0];

    message = field ? `O campo ${field} já está em uso.` : 'Já existe um registro com este valor.';
    statusCode = StatusCodes.BAD_REQUEST;
  } else if ((error as IBaseError)?.statusCode || (error as IBaseError)?.message) {
    statusCode = (error as IBaseError).statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    message = (error as IBaseError).message ?? ReasonPhrases.INTERNAL_SERVER_ERROR;
  }

  console.error('[ErrorHandler]', error);

  return res.status(statusCode).json({ message });
};
