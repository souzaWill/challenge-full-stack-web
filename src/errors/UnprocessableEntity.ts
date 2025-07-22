import { StatusCodes } from 'http-status-codes';
import { IBaseError } from './IBaseError';

export class UnprocessableEntity extends Error implements IBaseError {
  statusCode: number;

  constructor(message = 'Requisição não pode ser processada') {
    super(message);
    this.name = 'Unprocessable Entity';
    this.statusCode = StatusCodes.UNPROCESSABLE_ENTITY;
    Object.setPrototypeOf(this, UnprocessableEntity.prototype);
  }
}
