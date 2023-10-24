"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const errors_1 = require("./errors");
const errorHandler = (error, req, res, next) => {
    console.log(error);
    if (error instanceof errors_1.CustomError) {
        return res.status(error.statusCode).json({ error: error.message });
    }
    if (error instanceof errors_1.CustomValidationError) {
        const { errors, statusCode } = error;
        return res.status(statusCode).json({ errors: errors.map(e => e.message) });
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json({ error: error.message });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map