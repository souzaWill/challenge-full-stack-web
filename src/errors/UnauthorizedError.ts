import { IBaseError } from './IBaseError';

export class UnauthorizedError extends Error implements IBaseError {
  statusCode: number;

  constructor(message = 'Não autorizado') {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 401;
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
