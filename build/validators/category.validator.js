"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("../middlewares/errors");
const CategorySchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required()
});
const validateCategory = (body) => {
    const { error, value } = CategorySchema.validate(body);
    if (error) {
        throw new errors_1.CustomValidationError('Invalidated Fields', error.details);
    }
    return value;
};
exports.default = validateCategory;
//# sourceMappingURL=category.validator.js.map