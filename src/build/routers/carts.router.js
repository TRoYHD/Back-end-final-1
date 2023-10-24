"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const setUserId_middleware_1 = require("../middlewares/setUserId.middleware");
const carts_controller_1 = require("../controllers/carts.controller");
const helpers_1 = require("../helpers");
const cartsRouter = (0, express_1.Router)();
cartsRouter.use(passport_1.default.authenticate('jwt', { session: false }));
cartsRouter.use((0, helpers_1.use)(setUserId_middleware_1.setUserId));
cartsRouter.get('/', (0, helpers_1.use)(carts_controller_1.getCartProducts));
cartsRouter.post('/', (0, helpers_1.use)(carts_controller_1.addToCart));
cartsRouter.delete('/', (0, helpers_1.use)(carts_controller_1.removeFromCart));
exports.default = cartsRouter;
//# sourceMappingURL=carts.router.js.map