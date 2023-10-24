"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const setUserId_middleware_1 = require("../middlewares/setUserId.middleware");
const helpers_1 = require("../helpers");
const favourites_controller_1 = require("../controllers/favourites.controller");
const favRouter = (0, express_1.Router)();
favRouter.use(passport_1.default.authenticate('jwt', { session: false }));
favRouter.use((0, helpers_1.use)(setUserId_middleware_1.setUserId));
favRouter.get('/', (0, helpers_1.use)(favourites_controller_1.getFavouriteProducts));
favRouter.post('/add', (0, helpers_1.use)(favourites_controller_1.addToFavorites));
favRouter.post('/remove', (0, helpers_1.use)(favourites_controller_1.removeFromFavorites));
exports.default = favRouter;
//# sourceMappingURL=favourites.router.js.map