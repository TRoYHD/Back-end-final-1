"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const env_config_1 = __importDefault(require("./env.config"));
cloudinary_1.v2.config({
    cloud_name: env_config_1.default.cloudinaryCloudName,
    api_key: env_config_1.default.cloudinaryAPIKey,
    api_secret: env_config_1.default.cloudinaryAPISecret,
    secure: true,
});
exports.default = cloudinary_1.v2;
//# sourceMappingURL=cloudinary.config.js.map