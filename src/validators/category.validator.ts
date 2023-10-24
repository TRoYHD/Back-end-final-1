import Joi from 'joi';
import { CustomValidationError } from '../middlewares/errors';

export interface Category {
  name: string;
  description: string;
}

const CategorySchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required()
});

const validateCategory = (body: Category): Category => {
  const { error, value } = CategorySchema.validate(body);
  if (error) {
    throw new CustomValidationError('Invalidated Fields', error.details);
  }
  return value;
};

export default validateCategory;
