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
    // Assuming you store the token in local storage under the key 'token'
    const token = localStorage.getItem('token');
    if (!token) {
        next(new errors_1.CustomError('Unauthenticated', http_status_1.default.UNAUTHORIZED));
        return; // Make sure to return after calling next to stop further execution
    }
    const user = jsonwebtoken_1.default.decode(token);
    if (!user || typeof user.id !== 'number') {
        next(new errors_1.CustomError('Invalid token', http_status_1.default.UNAUTHORIZED));
        return; // Make sure to return after calling next to stop further execution
    }
    req.userId = user.id;
    next();
};
exports.setUserId = setUserId;
//# sourceMappingURL=setUserId.middleware.js.map