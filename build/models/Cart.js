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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const _1 = require("./");
const errors_1 = require("../middlewares/errors");
const http_status_1 = __importDefault(require("http-status"));
let Cart = class Cart extends sequelize_typescript_1.Model {
    addCartItem(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart_id = this.id;
            const { productId: product_id, quantity } = cart;
            const product = yield _1.Product.findByPk(product_id);
            if (!product)
                throw new errors_1.CustomError('Product not Found', http_status_1.default.NOT_FOUND);
            const cartItem = new _1.CartItem({
                cart_id,
                product_id: product_id,
                quantity
            });
            yield cartItem.save();
            yield this.$add('cartItems', cartItem);
        });
    }
    updateTotalPrice() {
        return __awaiter(this, void 0, void 0, function* () {
            const cartItems = (yield this.$get('cartItems', {
                include: _1.Product
            }));
            let newTotal = 0;
            let totalDiscount = 0;
            cartItems.forEach(cartItem => {
                const product = cartItem.product;
                if (product) {
                    const discountedPrice = product.discount > 0
                        ? product.price * (1 - product.discount / 100)
                        : product.price;
                    newTotal += discountedPrice * cartItem.quantity;
                    totalDiscount += (product.discount / 100) * product.price;
                }
            });
            this.total = newTotal - newTotal * this.tax;
            this.discount = totalDiscount;
            yield this.save();
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: false
    })
], Cart.prototype, "total", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DOUBLE,
        allowNull: true,
        defaultValue: 0
    })
], Cart.prototype, "discount", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        defaultValue: 0
    })
], Cart.prototype, "tax", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
        defaultValue: 'Pending'
    })
], Cart.prototype, "status", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => _1.User)
], Cart.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => _1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false
    })
], Cart.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => _1.Order)
], Cart.prototype, "order", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => _1.CartItem)
], Cart.prototype, "cartItems", void 0);
Cart = __decorate([
    (0, sequelize_typescript_1.Table)({
        timestamps: true,
        tableName: 'carts'
    })
], Cart);
exports.default = Cart;
//# sourceMappingURL=Cart.js.map