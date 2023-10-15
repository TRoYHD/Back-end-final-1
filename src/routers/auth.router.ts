import { Router } from 'express';
import { use } from '../helpers';
import { signIn, signUp } from '../controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post('/signup', use(signUp));
authRouter.post('/signin', use(signIn));

export default authRouter;
