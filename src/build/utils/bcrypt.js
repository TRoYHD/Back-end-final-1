"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_config_1 = __importDefault(require("../config/env.config"));
const SALT = env_config_1.default.salt;
const hashPassword = (password) => {
    return bcrypt_1.default.hashSync(password, SALT);
};
exports.hashPassword = hashPassword;
const compare = (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.compare = compare;
//# sourceMappingURL=bcrypt.js.map