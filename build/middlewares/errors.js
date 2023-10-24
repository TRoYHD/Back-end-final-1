"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationError = exports.CustomError = void 0;
const http_status_1 = __importDefault(require("http-status"));
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
class CustomValidationError extends Error {
    constructor(message, errors) {
        super(message);
        this.errors = errors;
        this.statusCode = http_status_1.default.UNPROCESSABLE_ENTITY;
    }
}
exports.CustomValidationError = CustomValidationError;
//# sourceMappingURL=errors.js.map