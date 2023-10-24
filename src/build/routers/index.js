"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = exports.favRouter = exports.cartsRouter = exports.brandsRouter = exports.categoriesRouter = exports.productsRouter = void 0;
var products_router_1 = require("./products.router");
Object.defineProperty(exports, "productsRouter", { enumerable: true, get: function () { return __importDefault(products_router_1).default; } });
var categories_router_1 = require("./categories.router");
Object.defineProperty(exports, "categoriesRouter", { enumerable: true, get: function () { return __importDefault(categories_router_1).default; } });
var brands_router_1 = require("./brands.router");
Object.defineProperty(exports, "brandsRouter", { enumerable: true, get: function () { return __importDefault(brands_router_1).default; } });
var carts_router_1 = require("./carts.router");
Object.defineProperty(exports, "cartsRouter", { enumerable: true, get: function () { return __importDefault(carts_router_1).default; } });
var favourites_router_1 = require("./favourites.router");
Object.defineProperty(exports, "favRouter", { enumerable: true, get: function () { return __importDefault(favourites_router_1).default; } });
var auth_router_1 = require("./auth.router");
Object.defineProperty(exports, "authRouter", { enumerable: true, get: function () { return __importDefault(auth_router_1).default; } });
//# sourceMappingURL=index.js.map