"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.default = {
    port: process.env.PORT,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,
    dbPassword: process.env.DB_PASSWORD,
    cloudinaryAPIKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryAPISecret: process.env.CLOUDINARY_API_SECRET,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    salt: process.env.SALT ? parseInt(process.env.SALT) : 10,
    secret: (_a = process.env.SECRET) !== null && _a !== void 0 ? _a : 'test'
};
//# sourceMappingURL=env.config.js.map