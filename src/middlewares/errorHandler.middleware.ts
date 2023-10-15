import { NextFunction, Request, Response } from 'express';
import HttpStatus from 'http-status';
import { CustomError, CustomValidationError } from './errors';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error);
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({ error: error.message });
  }

  if (error instanceof CustomValidationError) {
    const { errors, statusCode } = error;
    return res.status(statusCode).json({ errors: errors.map(e => e.message) });
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: error.message });
};
