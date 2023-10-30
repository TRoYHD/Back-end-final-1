"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const env_config_1 = __importDefault(require("../config/env.config"));
const models_1 = require("../models");
const connection = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: env_config_1.default.dbHost,
    username: env_config_1.default.dbUser,
    database: env_config_1.default.dbName,
    password: env_config_1.default.dbPassword,
    port: Number(env_config_1.default.dbPort) || 3306,
    logging: false,
    models: [
        models_1.Product,
        models_1.Category,
        models_1.Brand,
        models_1.Order,
        models_1.User,
        models_1.FavouriteList,
        models_1.Cart,
        models_1.CartItem,
        models_1.Address
    ]
});
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection.sync();
            console.log('Successfully connected to the database');
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.connect = connect;
//# sourceMappingURL=connect.js.map