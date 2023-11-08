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
exports.getProductsByDiscount = exports.getHandpickedCollections = exports.getNewArrivals = exports.searchProducts = exports.getLimitedEditionProducts = exports.getPopularInTheCommunity = exports.createProduct = exports.getProduct = exports.getProducts = void 0;
const models_1 = require("../models");
const errors_1 = require("../middlewares/errors");
const http_status_1 = __importDefault(require("http-status"));
const sequelize_1 = require("sequelize");
const validators_1 = require("../validators");
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const discount = req.query.discount;
    let where = {};
    if (discount) {
        where.discount = {
            [sequelize_1.Op.gte]: parseInt(discount)
        };
    }
    const { count, rows } = yield models_1.Product.findAndCountAll({
        where,
        offset: (page - 1) * perPage,
        limit: perPage,
        distinct: true
    });
    res.json({ count, rows });
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield models_1.Product.findByPk(id);
    if (!product)
        throw new errors_1.CustomError('Product not found', http_status_1.default.NOT_FOUND);
    res.json(product);
});
exports.getProduct = getProduct;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = (0, validators_1.validateProduct)(req.body);
    const category = yield models_1.Category.findByPk(body.category_id);
    const brand = yield models_1.Brand.findByPk(body.brand_id);
    if (!category)
        throw new errors_1.CustomError('Category not found', http_status_1.default.NOT_FOUND);
    if (!brand)
        throw new errors_1.CustomError('Brand not found', http_status_1.default.NOT_FOUND);
    const product = yield models_1.Product.create(Object.assign({}, body));
    res.status(http_status_1.default.CREATED).json(product);
});
exports.createProduct = createProduct;
const getProductsByDiscount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const { count: filteredCount, rows: filteredRows } = yield models_1.Product.findAndCountAll({
        where: {
            discount: { [sequelize_1.Op.gte]: 15 }
        }
    });
    const filteredProducts = filteredRows.filter(product => {
        const discountedPrice = product.price - (product.price * (product.discount / 100));
        return discountedPrice >= product.price * 0.15;
    });
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    res.json({ count: paginatedProducts.length, rows: paginatedProducts });
});
exports.getProductsByDiscount = getProductsByDiscount;
const getPopularInTheCommunity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const { count, rows } = yield models_1.Product.findAndCountAll({
        where: {
            rating: {
                [sequelize_1.Op.gte]: 4.5
            }
        },
        offset: (page - 1) * perPage,
        limit: perPage,
        distinct: true
    });
    res.json({ count, rows });
});
exports.getPopularInTheCommunity = getPopularInTheCommunity;
const getLimitedEditionProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const { count, rows } = yield models_1.Product.findAndCountAll({
        where: {
            isLimited: true,
            stock: {
                [sequelize_1.Op.lt]: 20,
            },
        },
        offset: (page - 1) * perPage,
        limit: perPage,
        distinct: true
    });
    res.json({ count, rows });
});
exports.getLimitedEditionProducts = getLimitedEditionProducts;
const getNewArrivals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 5;
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    const { count, rows } = yield models_1.Product.findAndCountAll({
        where: {
            createdAt: {
                [sequelize_1.Op.between]: [threeMonthsAgo, currentDate]
            }
        },
        offset: (page - 1) * perPage,
        limit: perPage,
        distinct: true
    });
    res.json({ count, rows });
});
exports.getNewArrivals = getNewArrivals;
const getHandpickedCollections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 4;
    try {
        const { count, rows } = yield models_1.Product.findAndCountAll({
            where: {
                [sequelize_1.Op.and]: [{ rating: { [sequelize_1.Op.gt]: 4.5 } }, { price: { [sequelize_1.Op.lt]: 100 } }]
            },
            offset: (page - 1) * perPage,
            limit: perPage,
            distinct: true
        });
        res.json({ count, rows });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getHandpickedCollections = getHandpickedCollections;
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const keyword = (_a = req.query.keyword) !== null && _a !== void 0 ? _a : '';
    const { count, rows } = yield models_1.Product.findAndCountAll({
        where: {
            [sequelize_1.Op.or]: [
                { name: { [sequelize_1.Op.like]: `%${keyword}%` } },
                { '$brand.name$': { [sequelize_1.Op.like]: `%${keyword}%` } }
            ]
        },
        include: [
            {
                model: models_1.Brand,
                where: {}
            }
        ],
        offset: (page - 1) * perPage,
        limit: perPage,
        distinct: true
    });
    res.json({ count, rows });
});
exports.searchProducts = searchProducts;
//# sourceMappingURL=products.controller.js.map