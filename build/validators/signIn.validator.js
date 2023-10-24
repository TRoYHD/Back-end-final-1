"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("../middlewares/errors");
const SignInSchema = joi_1.default.object({
    password: joi_1.default.string().required(),
    email: joi_1.default.string().email().required()
});
const validateSignedInUsers = (body) => {
    const { error, value } = SignInSchema.validate(body);
    if (error) {
        throw new errors_1.CustomValidationError('Invalidated Fields', error.details);
    }
    return value;
};
exports.default = validateSignedInUsers;
//# sourceMappingURL=signIn.validator.js.map