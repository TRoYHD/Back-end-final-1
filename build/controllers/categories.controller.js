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
exports.getProductsCategory = exports.createCategory = exports.getCategory = exports.getCategories = void 0;
const models_1 = require("../models");
const errors_1 = require("../middlewares/errors");
const http_status_1 = __importDefault(require("http-status"));
const category_validator_1 = __importDefault(require("../validators/category.validator"));
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield models_1.Category.findAll();
    res.json(categories);
});
exports.getCategories = getCategories;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield models_1.Category.findByPk(id);
    if (!category)
        throw new errors_1.CustomError('Category not found', http_status_1.default.NOT_FOUND);
    res.json(category);
});
exports.getCategory = getCategory;
const getCategoryProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 4;
    const { id } = req.params;
    const { count, rows } = yield models_1.Product.findAndCountAll({
        include: [
            {
                model: models_1.Category,
                where: {
                    id
                },
                attributes: []
            },
        ],
        offset: (page - 1) * perPage,
        limit: perPage,
        distinct: true
    });
    res.json({ count, rows });
});
exports.getProductsCategory = getCategoryProducts;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = (0, category_validator_1.default)(req.body);
    const { name, description } = body;
});
exports.createCategory = createCategory;
//# sourceMappingURL=categories.controller.js.map