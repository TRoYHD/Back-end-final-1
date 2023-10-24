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
exports.getFavouriteProducts = exports.removeFromFavorites = exports.addToFavorites = void 0;
const models_1 = require("../models");
const errors_1 = require("../middlewares/errors");
const http_status_1 = __importDefault(require("http-status"));
const addToFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    const userId = req.userId;
    const user = yield models_1.User.findByPk(userId);
    const product = yield models_1.Product.findByPk(productId);
    if (!user)
        throw new errors_1.CustomError('User not found', http_status_1.default.NOT_FOUND);
    if (!product)
        throw new errors_1.CustomError('Product not found', http_status_1.default.NOT_FOUND);
    const isProductInFavorites = yield user.$has('favouriteList', product);
    if (isProductInFavorites) {
        res
            .status(http_status_1.default.OK)
            .json({ message: 'Product is already in favorites' });
    }
    else {
        yield user.$add('favouriteList', product);
        res.status(http_status_1.default.OK).json({ message: 'Product added to favorites' });
    }
});
exports.addToFavorites = addToFavorites;
const removeFromFavorites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = req.body;
    const userId = req.userId;
    const user = yield models_1.User.findByPk(userId);
    const product = yield models_1.Product.findByPk(productId);
    if (!user)
        throw new errors_1.CustomError('User not found', http_status_1.default.NOT_FOUND);
    if (!product)
        throw new errors_1.CustomError('Product not found', http_status_1.default.NOT_FOUND);
    const isProductInFavorites = yield user.$has('favouriteList', product);
    if (isProductInFavorites) {
        yield user.$remove('favouriteList', product);
        res
            .status(http_status_1.default.OK)
            .json({ message: 'Product removed from favorites' });
    }
    else {
        res.status(http_status_1.default.OK).json({ message: 'Product is not in favorites' });
    }
});
exports.removeFromFavorites = removeFromFavorites;
const getFavouriteProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const user = yield models_1.User.findByPk(userId);
    if (!user)
        throw new errors_1.CustomError('User not found', http_status_1.default.NOT_FOUND);
    const products = yield models_1.Product.findAll({
        include: {
            model: models_1.User,
            attributes: [],
            where: {
                id: userId
            }
        }
    });
    res.status(http_status_1.default.OK).json(products);
});
exports.getFavouriteProducts = getFavouriteProducts;
//# sourceMappingURL=favourites.controller.js.map