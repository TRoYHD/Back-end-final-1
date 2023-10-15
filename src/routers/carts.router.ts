import { Router } from 'express';
import passport from 'passport';
import { setUserId } from '../middlewares/setUserId.middleware';
import {
  addToCart,
  getCartProducts,
  removeFromCart
} from '../controllers/carts.controller';
import { use } from '../helpers';

const cartsRouter: Router = Router();

cartsRouter.use(passport.authenticate('jwt', { session: false }));

cartsRouter.use(use(setUserId));

cartsRouter.get('/', use(getCartProducts));
cartsRouter.post('/', use(addToCart));
cartsRouter.delete('/', use(removeFromCart));

export default cartsRouter;
