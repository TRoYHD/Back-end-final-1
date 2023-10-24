"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("../middlewares/errors");
const ProductSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    color: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    discount: joi_1.default.number().optional().default(0),
    rating: joi_1.default.number().default(0),
    isLimited: joi_1.default.boolean().default(false),
    category_id: joi_1.default.number().required(),
    brand_id: joi_1.default.number().required()
});
const validateProduct = (body) => {
    const { error, value } = ProductSchema.validate(body);
    if (error) {
        throw new errors_1.CustomValidationError('Invalidated Fields', error.details);
    }
    return value;
};
exports.default = validateProduct;
//# sourceMappingURL=product.validator.js.map