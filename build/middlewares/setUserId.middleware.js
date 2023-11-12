"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUserId = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("./errors");
const http_status_1 = __importDefault(require("http-status"));
const env_config_1 = __importDefault(require("../config/env.config"));
const setUserId = (req, res, next) => {
    // Check for the Authorization header
    const token = req.header('Authorization');
    if (!token) {
        next(new errors_1.CustomError('Unauthenticated', http_status_1.default.UNAUTHORIZED));
        return;
    }
    try {
        // Verify the token and decode the user information
        const user = jsonwebtoken_1.default.verify(token, env_config_1.default.secret);
        // Ensure the decoded user object has the expected format
        if (!user || typeof user.id !== 'number') {
            throw new Error('Invalid token content');
        }
        // Attach the user ID to the request object
        req.userId = user.id;
        next();
    }
    catch (error) {
        console.error('Token verification error:', error);
        next(new errors_1.CustomError('Invalid token', http_status_1.default.UNAUTHORIZED));
    }
};
exports.setUserId = setUserId;
//# sourceMappingURL=setUserId.middleware.js.map