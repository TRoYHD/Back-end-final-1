"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const helpers_1 = require("../helpers");
const paginate_middleware_1 = require("../middlewares/paginate.middleware");
const productsRouter = (0, express_1.Router)();
productsRouter.get('/', paginate_middleware_1.paginateMiddleware, (0, helpers_1.use)(products_controller_1.getProducts));
productsRouter.post('/', (0, helpers_1.use)(products_controller_1.createProduct));
productsRouter.get('/popular', paginate_middleware_1.paginateMiddleware, (0, helpers_1.use)(products_controller_1.getPopularInTheCommunity));
productsRouter.get('/limited-edition', paginate_middleware_1.paginateMiddleware, (0, helpers_1.use)(products_controller_1.getLimitedEditionProducts));
productsRouter.get('/handpicked-collections', paginate_middleware_1.paginateMiddleware, (0, helpers_1.use)(products_controller_1.getHandpickedCollections));
productsRouter.put('/:id', (0, helpers_1.use)(products_controller_1.uploadProductImage));
productsRouter.get('/search', paginate_middleware_1.paginateMiddleware, (0, helpers_1.use)(products_controller_1.searchProducts));
productsRouter.get('/new-arrivals', paginate_middleware_1.paginateMiddleware, (0, helpers_1.use)(products_controller_1.getNewArrivals));
productsRouter.get('/:id', (0, helpers_1.use)(products_controller_1.getProduct));
productsRouter.get('/products/discount', products_controller_1.getProductsByDiscount);
exports.default = productsRouter;
//# sourceMappingURL=products.router.js.map