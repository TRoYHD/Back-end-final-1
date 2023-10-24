import Joi from 'joi';
import { CustomValidationError } from '../middlewares/errors';

export interface Address {
  fullName: string;
  mobileNumber: string;
  street: string;
  state: string;
  city: string;
  pinCode: string;
}

const AddressSchema = Joi.object({
  full_name: Joi.string().required(),
  mobileNumber: Joi.string().length(10).pattern(/^\d+$/).required(),
  street: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  pinCode: Joi.string().required()
});

const validateAddress = (body: Address): Address => {
  const { error, value } = AddressSchema.validate(body);
  if (error) {
    throw new CustomValidationError('Invalidated Fields', error.details);
  }
  return value;
};

export default validateAddress;
