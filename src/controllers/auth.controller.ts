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

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new CustomError('Email already exists', httpStatus.BAD_REQUEST);
  }

  // If the email is not found, create a new user
  const newUser = await User.create({ name, email, password });

  const payload: Payload = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email
  };

  const token = generateToken(payload, envConfig.secret);

  res.cookie('token', token, { httpOnly: true });
  
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
  console.log('Sign-out request received');
  res.clearCookie('token');
  res.status(httpStatus.OK).json({ message: 'User signed out' });
  console.log('Sign-out response sent');
};

export { signUp, signIn, signOut };

// To send the token from the server to the frontend team so that they can store it in local storage, you can include the token in the JSON response sent from the server. Here's an example of how you can modify your server-side code to achieve this:

// javascript
// Copy code
// const token = generateToken(payload, envConfig.secret);

// // Sending the token in the response to the frontend team
// res.json({ user: payload, token });
// In this code snippet, after generating the token using the generateToken function, you include it in the JSON response object. When the frontend team receives the response on the client-side, they can extract the token from the JSON response and store it in the local storage using JavaScript.

// On the frontend side (in a JavaScript file or script tag in your HTML file), you can handle the response and store the token in local storage like this:

// javascript
// Copy code
// // Assuming you make a fetch or XMLHttpRequest to the server and get the response object
// fetch('your-api-endpoint')
//   .then(response => response.json())
//   .then(data => {
//     // Extract the token from the response
//     const token = data.token;

//     // Store the token in local storage
//     localStorage.setItem('token', token);

//     // Now, the token is stored in local storage and can be used as needed
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// In this example, the localStorage.setItem('token', token) line stores the received token in the local storage of the user's 
// browser. From this point, the frontend team can access the token from local storage and use it in subsequent requests to the server for authentication or other purposes.