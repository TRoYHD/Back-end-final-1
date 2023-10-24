import Joi from 'joi';
import { CustomValidationError } from '../middlewares/errors';

export interface Product {
  name: string;
  description: string;
  color: string;
  price: number;
  discount: number;
  rating: number;
  quantity: number;
  category_id: number;
  brand_id: number;
}

const ProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  color: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number().optional().default(0),
  rating: Joi.number().default(0),
  isLimited: Joi.boolean().default(false),
  category_id: Joi.number().required(),
  brand_id: Joi.number().required()
});

const validateProduct = (body: Product): Product => {
  const { error, value } = ProductSchema.validate(body);
  if (error) {
    throw new CustomValidationError('Invalidated Fields', error.details);
  }
  return value;
};

export default validateProduct;
