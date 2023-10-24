"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_controller_1 = require("../controllers/categories.controller");
const helpers_1 = require("../helpers");
const paginate_middleware_1 = require("../middlewares/paginate.middleware");
const categoriesRouter = (0, express_1.Router)();
categoriesRouter.get('/', (0, helpers_1.use)(categories_controller_1.getCategories));
categoriesRouter.post('/', (0, helpers_1.use)(categories_controller_1.createCategory));
categoriesRouter.get('/:id', (0, helpers_1.use)(categories_controller_1.getCategory));
categoriesRouter.get('/:id/products', paginate_middleware_1.paginateMiddleware, (0, helpers_1.use)(categories_controller_1.getProductsCategory));
exports.default = categoriesRouter;
//# sourceMappingURL=categories.router.js.map