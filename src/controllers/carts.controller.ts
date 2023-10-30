import { Request, RequestHandler, Response } from 'express';
import { Cart, Product,  User } from '../models';
import httpStatus from 'http-status';
import { CustomError } from '../middlewares/errors';

const addToCart: RequestHandler<
  object,
  object,
  { productId: number; quantity: number }
> = async (
  req: Request<object, object, { productId: number; quantity: number }>,
  res: Response
) => {
  const { productId, quantity } = req.body;

  const userId = req.userId;
  const user = await User.findByPk(userId, { include: { model: Cart } });

  if (!user) throw new CustomError('User not found', httpStatus.NOT_FOUND);

  const cart = await user.getCart();
  const cartItems = await cart.$get('cartItems');

  const hasProduct = cartItems.find(
    cartItem => cartItem.product_id === productId
  );

  if (hasProduct) {
    hasProduct.quantity += quantity;
    await hasProduct.save();
  } else {
    await cart.addCartItem({ productId, quantity });
  }

  await cart.updateTotalPrice();

  res.status(httpStatus.CREATED).json({ msg: 'Item added successfully' });
};

const removeFromCart: RequestHandler<
  object,
  object,
  { productId: number }
> = async (
  req: Request<object, object, { productId: number }>,
  res: Response
) => {
  const { productId } = req.body;

  const userId = req.userId;
  const user = await User.findByPk(userId, { include: { model: Cart } });

  if (!user) throw new CustomError('User not found', httpStatus.NOT_FOUND);

  const cart = await user.getCart();
  const cartItems = await cart.$get('cartItems');

  const cartItemToRemove = cartItems.find(
    cartItem => cartItem.product_id === productId
  );

  if (!cartItemToRemove) {
    throw new CustomError('Product not found in cart', httpStatus.NOT_FOUND);
  }

  await cartItemToRemove.destroy();

  await cart.updateTotalPrice();

  res
    .status(httpStatus.OK)
    .json({ msg: 'Item removed from cart successfully' });
};

const getCartProducts: RequestHandler = async (req: Request, res: Response) => {
  const userId = req.userId;
  const user = await User.findByPk(userId, { include: { model: Cart } });

  if (!user) throw new CustomError('User not found', httpStatus.NOT_FOUND);

  const cart = await user.getCart();
  const cartItems = await cart.$get('cartItems', {
    include: { model: Product }
  });

  res.status(httpStatus.OK).json(cartItems);
};

export { addToCart, removeFromCart, getCartProducts };
