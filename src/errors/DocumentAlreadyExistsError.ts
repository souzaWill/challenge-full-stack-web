import { IBaseError } from './IBaseError';
import { StatusCodes } from 'http-status-codes';

export class DocumentAlreadyExistsError extends Error implements IBaseError {
  statusCode: number;

  constructor(message = 'Documento já está cadastrado') {
    super(message);
    this.name = 'DocumentAlreadyExistsError';
    this.statusCode = StatusCodes.BAD_REQUEST;
    Object.setPrototypeOf(this, DocumentAlreadyExistsError.prototype);
  }
}
