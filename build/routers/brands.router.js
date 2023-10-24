"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helpers_1 = require("../helpers");
const brands_controller_1 = require("../controllers/brands.controller");
const brandsRouter = (0, express_1.Router)();
brandsRouter.get('/', (0, helpers_1.use)(brands_controller_1.getBrands));
brandsRouter.post('/', (0, helpers_1.use)(brands_controller_1.createBrand));
brandsRouter.get('/:id', (0, helpers_1.use)(brands_controller_1.getBrand));
exports.default = brandsRouter;
//# sourceMappingURL=brands.router.js.map