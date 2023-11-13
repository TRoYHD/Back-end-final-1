import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from './errors';
import httpStatus from 'http-status';
import envConfig from '../config/env.config';

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
  // Check for the Authorization header
  const token = req.header('Authorization');
  console.log('Received Token:', token);

  // Check if token format is correct
  if (!token || !token.startsWith('Bearer ')) {
    console.error('Invalid token format');
    next(new CustomError('Invalid token format', httpStatus.UNAUTHORIZED));
    return;
  }

  try {
    // Extract token without the "Bearer " prefix
    const tokenWithoutBearer = token.slice('Bearer '.length);

    // Verify the token and decode the user information
    const user = jwt.verify(tokenWithoutBearer, envConfig.secret) as { id: number };

    // Ensure the decoded user object has the expected format
    if (!user || typeof user.id !== 'number') {
      throw new Error('Invalid token content');
    }

    // Attach the user ID to the request object
    req.userId = user.id;
    next();
  } catch (error: any) { // Use 'any' type here
    console.error('Token verification error:', error);

    // Handle TokenExpiredError separately
    if (error.name === 'TokenExpiredError') {
      next(new CustomError('Token expired', httpStatus.UNAUTHORIZED));
    } else {
      next(new CustomError('Invalid token', httpStatus.UNAUTHORIZED));
    }
  }
};

export { setUserId };