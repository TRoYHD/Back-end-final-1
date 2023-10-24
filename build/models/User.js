"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require("./");
const bcrypt_1 = require("../utils/bcrypt");
let User = class User extends sequelize_typescript_1.Model {
    static hashPassword(user) {
        const hash = (0, bcrypt_1.hashPassword)(user.password);
        user.password = hash;
    }
    getCart() {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield _1.Cart.findOrCreate({
                where: { user_id: this.id },
                defaults: {
                    total: 0
                }
            });
            return cart[0];
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], User.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false
    })
], User.prototype, "password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Invalid email address'
            }
        }
    })
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => _1.Order)
], User.prototype, "orders", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => _1.Product, () => _1.FavouriteList)
], User.prototype, "favouriteList", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => _1.Address)
], User.prototype, "addresses", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => _1.Cart)
], User.prototype, "cart", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate
], User, "hashPassword", null);
User = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'users'
    })
], User);
exports.default = User;
//# sourceMappingURL=User.js.map