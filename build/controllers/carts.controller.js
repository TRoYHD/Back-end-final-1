"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCartProducts = exports.removeFromCart = exports.addToCart = void 0;
const models_1 = require("../models");
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("../middlewares/errors");
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    const user = yield models_1.User.findByPk(userId, { include: { model: models_1.Cart } });
    if (!user)
        throw new errors_1.CustomError('User not found', http_status_1.default.NOT_FOUND);
    const cart = yield user.getCart();
    const cartItems = yield cart.$get('cartItems');
    const hasProduct = cartItems.find(cartItem => cartItem.product_id === productId);
    if (hasProduct) {
        hasProduct.quantity += quantity;
        yield hasProduct.save();
    }
    else {
        yield cart.addCartItem({ productId, quantity });
    }
    yield cart.updateTotalPrice();
    res.status(http_status_1.default.CREATED).json({ msg: 'Item added successfully' });
});
exports.addToCart = addToCart;
const removeFromCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    const userId = req.userId;
    const user = yield models_1.User.findByPk(userId, { include: { model: models_1.Cart } });
    if (!user)
        throw new errors_1.CustomError('User not found', http_status_1.default.NOT_FOUND);
    const cart = yield user.getCart();
    const cartItems = yield cart.$get('cartItems');
    const cartItemToRemove = cartItems.find(cartItem => cartItem.product_id === productId);
    if (!cartItemToRemove) {
        throw new errors_1.CustomError('Product not found in cart', http_status_1.default.NOT_FOUND);
    }
    yield cartItemToRemove.destroy();
    yield cart.updateTotalPrice();
    res
        .status(http_status_1.default.OK)
        .json({ msg: 'Item removed from cart successfully' });
});
exports.removeFromCart = removeFromCart;
const getCartProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const user = yield models_1.User.findByPk(userId, { include: { model: models_1.Cart } });
    if (!user)
        throw new errors_1.CustomError('User not found', http_status_1.default.NOT_FOUND);
    const cart = yield user.getCart();
    const cartItems = yield cart.$get('cartItems', {
        include: { model: models_1.Product }
    });
    res.status(http_status_1.default.OK).json(cartItems);
});
exports.getCartProducts = getCartProducts;
//# sourceMappingURL=carts.controller.js.map