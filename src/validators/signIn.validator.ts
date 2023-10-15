import Joi from 'joi';
import { CustomValidationError } from '../middlewares/errors';

export interface SignIn {
  password: string;
  email: string;
}

const SignInSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().email().required()
});

const validateSignedInUsers = (body: SignIn): SignIn => {
  const { error, value } = SignInSchema.validate(body);
  if (error) {
    throw new CustomValidationError('Invalidated Fields', error.details);
  }
  return value;
};

export default validateSignedInUsers;
