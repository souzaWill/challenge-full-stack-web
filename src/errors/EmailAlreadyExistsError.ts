import { IBaseError } from './IBaseError';
import { StatusCodes } from 'http-status-codes';

export class EmailAlreadyExistsError extends Error implements IBaseError {
  statusCode: number;

  constructor(message = 'E-mail já cadastrado') {
    super(message);
    this.name = 'EmailAlreadyExistsError';
    this.statusCode = StatusCodes.BAD_REQUEST;
    Object.setPrototypeOf(this, EmailAlreadyExistsError.prototype);
  }
}
