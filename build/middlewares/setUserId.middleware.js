"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("./errors");
const http_status_1 = __importDefault(require("http-status"));
const setUserId = (req, res, next) => {
    const { token } = req.cookies;
    if (!token)
        next(new errors_1.CustomError('Unauthenticated', http_status_1.default.UNAUTHORIZED));
    const user = jsonwebtoken_1.default.decode(token);
    req.userId = user.id;
    next();
};
exports.setUserId = setUserId;
//# sourceMappingURL=setUserId.middleware.js.map