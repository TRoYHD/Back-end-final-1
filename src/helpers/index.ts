import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Payload } from '../interfaces';

const use =
  <P, ResBody, ReqBody, Query>(
    fn: RequestHandler<P, ResBody, ReqBody, Query>
  ) =>
  (
    req: Request<P, ResBody, ReqBody, Query>,
    res: Response,
    next: NextFunction
  ) =>
    Promise.resolve(fn(req, res, next)).catch(next);

const generateToken = (payload: Payload, secret: string) => {
  const token = jwt.sign(payload, secret, { expiresIn: '30d' });
  return token;
};

export { use, generateToken };
