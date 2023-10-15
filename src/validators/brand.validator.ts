import Joi from 'joi';
import { CustomValidationError } from '../middlewares/errors';
import { Category } from './category.validator';

export type Brand = Category;

const BrandSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});

const validateBrand = (body: Brand): Brand => {
  const { error, value } = BrandSchema.validate(body);
  if (error) {
    throw new CustomValidationError('Invalidated Fields', error.details);
  }
  return value;
};

export default validateBrand;
