"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = exports.use = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const use = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.use = use;
const generateToken = (payload, secret) => {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: '30d' });
    return token;
};
exports.generateToken = generateToken;
//# sourceMappingURL=index.js.map