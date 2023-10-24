"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("../middlewares/errors");
const AddressSchema = joi_1.default.object({
    full_name: joi_1.default.string().required(),
    mobileNumber: joi_1.default.string().length(10).pattern(/^\d+$/).required(),
    street: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    pinCode: joi_1.default.string().required()
});
const validateAddress = (body) => {
    const { error, value } = AddressSchema.validate(body);
    if (error) {
        throw new errors_1.CustomValidationError('Invalidated Fields', error.details);
    }
    return value;
};
exports.default = validateAddress;
//# sourceMappingURL=address.validator.js.map