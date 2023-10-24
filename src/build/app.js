"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const connect_1 = require("./connection/connect");
const routers_1 = require("./routers");
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_status_1 = __importDefault(require("http-status"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, express_1.urlencoded)({ extended: false }));
app.use((0, express_1.json)());
app.use((0, cors_1.default)({ origin: '*' }));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: '/tmp'
}));
app.use(passport_1.default.initialize());
app.use((0, cookie_parser_1.default)());
require('./auth/passport');
// Database Connection
(0, connect_1.connect)();
// 🚀 Welcoming endpoint
app.get('/', (req, res) => {
    res.json({
        msg: 'Welcome to our API 🚀'
    });
});
// Routes
app.use('/products', routers_1.productsRouter);
app.use('/categories', routers_1.categoriesRouter);
app.use('/brands', routers_1.brandsRouter);
app.use('/auth', routers_1.authRouter);
app.use('/carts', routers_1.cartsRouter);
app.use('/favourites', routers_1.favRouter);
// Handle not found routes
app.get('*', function (_req, res) {
    res.status(http_status_1.default.NOT_FOUND).json({ msg: 'Not Found 😕' });
});
// Post Middlewares
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map