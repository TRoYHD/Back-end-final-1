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
exports.createBrand = exports.getBrand = exports.getBrands = void 0;
const models_1 = require("../models");
const errors_1 = require("../middlewares/errors");
const http_status_1 = __importDefault(require("http-status"));
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const validators_1 = require("../validators");
const getBrands = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const brands = yield models_1.Brand.findAll();
    res.json(brands);
});
exports.getBrands = getBrands;
const getBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const brand = yield models_1.Brand.findByPk(id);
    console.log('Requested Brand ID:', id);
    if (!brand)
        throw new errors_1.CustomError('Brand not found', http_status_1.default.NOT_FOUND);
    console.log('Brand not found in the database.');
    res.json(brand);
});
exports.getBrand = getBrand;
const createBrand = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Request Body:', req.body);
    console.log('Request Files:', req.files);
    const body = (0, validators_1.validateBrand)(req.body);
    // Trim field names
    const name = body.name.trim();
    const description = body.description.trim();
    if (req.files && req.files.image && !Array.isArray(req.files.image)) {
        const imgTempPath = req.files.image.tempFilePath;
        const result = yield cloudinary_config_1.default.uploader.upload(imgTempPath);
        const image = result.url;
        const brand = yield models_1.Brand.create({
            name,
            description,
            image
        });
        return res.status(http_status_1.default.CREATED).json(brand);
    }
    res
        .status(http_status_1.default.UNPROCESSABLE_ENTITY)
        .json({ msg: 'Please upload an image' });
});
exports.createBrand = createBrand;
//# sourceMappingURL=brands.controller.js.map