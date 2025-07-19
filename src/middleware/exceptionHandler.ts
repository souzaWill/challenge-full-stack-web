import { Request, Response, NextFunction } from 'express';
import { IBaseError } from '../errors/IBaseError';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export const exceptionHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = (error as IBaseError).statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = (error as IBaseError).message || ReasonPhrases.INTERNAL_SERVER_ERROR;

  return res.status(statusCode).send({ statusCode, message });
};
