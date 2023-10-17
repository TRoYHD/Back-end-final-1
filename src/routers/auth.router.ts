import { Router } from 'express';
import { use } from '../helpers';
import { signIn, signUp ,signOut } from '../controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post('/signup', use(signUp));
authRouter.post('/signin', use(signIn));
authRouter.post('/signout', use(signOut));


export default authRouter;
