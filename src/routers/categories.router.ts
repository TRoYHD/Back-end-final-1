import { Router } from 'express';
import {
  createCategory,
  getCategory,
  getCategories,
  getProductsCategory ,
  getBrandsProducts
} from '../controllers/categories.controller';
import { use } from '../helpers';
import { paginateMiddleware } from '../middlewares/paginate.middleware';

const categoriesRouter: Router = Router();

categoriesRouter.get('/', use(getCategories));
categoriesRouter.post('/', use(createCategory));
categoriesRouter.get('/:id', use(getCategory));
categoriesRouter.get(
  '/:id/products',
  paginateMiddleware,
  use(getProductsCategory) 
)
categoriesRouter.get(
  '/:id/products/brands',
  paginateMiddleware,
  use(getBrandsProducts) 
);

export default categoriesRouter;
