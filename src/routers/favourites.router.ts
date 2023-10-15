import { Router } from 'express';
import passport from 'passport';
import { setUserId } from '../middlewares/setUserId.middleware';
import { use } from '../helpers';
import {
  addToFavorites,
  getFavouriteProducts,
  removeFromFavorites
} from '../controllers/favourites.controller';

const favRouter: Router = Router();

favRouter.use(passport.authenticate('jwt', { session: false }));
favRouter.use(use(setUserId));

favRouter.get('/', use(getFavouriteProducts));
favRouter.post('/add', use(addToFavorites));
favRouter.post('/remove', use(removeFromFavorites));

export default favRouter;
