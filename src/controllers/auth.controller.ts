import { Request, RequestHandler, Response } from 'express';
import { User } from '../models';
import { validateSignedInUsers, validateUser } from '../validators';
import { Payload } from '../interfaces';
import httpStatus from 'http-status';
import { CustomError } from '../middlewares/errors';
import { compare } from '../utils/bcrypt';
import { generateToken } from '../helpers';
import envConfig from '../config/env.config';
import { SignIn } from '../validators/signIn.validator';

const signUp: RequestHandler<object, object, User> = async (
  req: Request<object, object, User>,
  res: Response
) => {
  validateUser(req.body);
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  const payload: Payload = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  res.status(httpStatus.CREATED).json(payload);
};

const signIn: RequestHandler<object, object, SignIn> = async (
  req: Request<object, object, SignIn>,
  res: Response
) => {
  validateSignedInUsers(req.body);
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new CustomError('User not found', httpStatus.NOT_FOUND);
  }

  if (!compare(password, user.password)) {
    throw new CustomError('Invalid credentials', httpStatus.UNAUTHORIZED);
  }

  const payload: Payload = {
    id: user.id,
    name: user.name,
    email: user.email
  };

  const token = generateToken(payload, envConfig.secret);

  res.cookie('token', token, { httpOnly: true });

  res.json({ user: payload, token });
};

const signOut: RequestHandler = async (req: Request, res: Response) => {
  // Clear the authentication token from the client-side (browser)
  res.clearCookie('token');

  // Send a response indicating successful sign-out
  res.status(httpStatus.OK).json({ message: 'User has been successfully signed out' });
 
};

export { signUp, signIn, signOut };

