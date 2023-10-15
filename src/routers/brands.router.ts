import { Router } from 'express';
import { use } from '../helpers';
import {
  createBrand,
  getBrand,
  getBrands
} from '../controllers/brands.controller';

const brandsRouter: Router = Router();

brandsRouter.get('/', use(getBrands));
brandsRouter.post('/', use(createBrand));
brandsRouter.get('/:id', use(getBrand));

export default brandsRouter;
