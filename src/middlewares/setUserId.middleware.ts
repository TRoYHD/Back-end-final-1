import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from './errors';
import httpStatus from 'http-status';

declare global {
  namespace Express {
    interface Request {
      userId: number;
    }
  }
}

const setUserId: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Assuming you store the token in local storage under the key 'token'
  const token = localStorage.getItem('token');

  if (!token) {
    next(new CustomError('Unauthenticated', httpStatus.UNAUTHORIZED));
    return; // Make sure to return after calling next to stop further execution
  }

  const user = jwt.decode(token) as { id: number };
  if (!user || typeof user.id !== 'number') {
    next(new CustomError('Invalid token', httpStatus.UNAUTHORIZED));
    return; // Make sure to return after calling next to stop further execution
  }

  req.userId = user.id;
  next();
};

export { setUserId };