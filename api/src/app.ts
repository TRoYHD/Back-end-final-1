import express, {
  Application,
  Request,
  Response,
  json,
  urlencoded
} from 'express';
import { connect } from './connection/connect';
import {
  productsRouter,
  categoriesRouter,
  brandsRouter,
  authRouter,
  cartsRouter,
  favRouter
} from './routers';
import cors from 'cors';
import passport from 'passport';
import { errorHandler } from './middlewares/errorHandler.middleware';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';



const app: Application = express();

// Middlewares
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors({ origin: '*' }));
app.use(fileUpload({
  
  useTempFiles: true,
  tempFileDir: '/tmp'
}));

app.use(passport.initialize());
app.use(cookieParser());

require('./auth/passport');

// Database Connection
connect();

// 🚀 Welcoming endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    msg: 'Welcome to our API 🚀'
  });
});

// Routes
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/brands', brandsRouter);
app.use('/auth', authRouter);
app.use('/carts', cartsRouter);
app.use('/favourites', favRouter);

// Handle not found routes
app.get('*', function (_req: Request, res: Response) {
  res.status(httpStatus.NOT_FOUND).json({ msg: 'Not Found 😕' });
});

// Post Middlewares
app.use(errorHandler);

export default app;
