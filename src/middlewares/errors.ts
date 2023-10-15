import httpStatus from 'http-status';
import Joi from 'joi';

export class CustomError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}

export class CustomValidationError extends Error {
  statusCode: number;

  constructor(message: string, public errors: Joi.ValidationErrorItem[]) {
    super(message);
    this.statusCode = httpStatus.UNPROCESSABLE_ENTITY;
  }
}
