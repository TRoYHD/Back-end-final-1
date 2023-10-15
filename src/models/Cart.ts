import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  HasMany,
  HasOne,
  ForeignKey
} from 'sequelize-typescript';
import { User, Order, CartItem, Product } from './';
import { CustomError } from '../middlewares/errors';
import httpStatus from 'http-status';

@Table({
  timestamps: true,
  tableName: 'carts'
})
export default class Cart extends Model {
  @Column({
    type: DataType.DOUBLE,
    allowNull: false
  })
  total!: number;

  @Column({
    type: DataType.DOUBLE,
    allowNull: true,
    defaultValue: 0
  })
  discount!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0
  })
  tax!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Pending'
  })
  status!: string;

  @BelongsTo(() => User)
  user!: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  user_id!: number;

  @HasOne(() => Order)
  order!: Order;

  @HasMany(() => CartItem)
  cartItems!: CartItem[];

  async addCartItem(cart: { productId: number; quantity: number }) {
    const cart_id: number = this.id;
    const { productId: product_id, quantity } = cart;

    const product = await Product.findByPk(product_id);
    if (!product)
      throw new CustomError('Product not Found', httpStatus.NOT_FOUND);

    const cartItem = new CartItem({
      cart_id,
      product_id: product_id,
      quantity
    });

    await cartItem.save();

    await this.$add('cartItems', cartItem);
  }

  async updateTotalPrice() {
    const cartItems = (await this.$get('cartItems', {
      include: Product
    })) as CartItem[];

    let newTotal = 0;
    let totalDiscount = 0;

    cartItems.forEach(cartItem => {
      const product = cartItem.product;
      if (product) {
        const discountedPrice =
          product.discount > 0
            ? product.price * (1 - product.discount / 100)
            : product.price;
        newTotal += discountedPrice * cartItem.quantity;
        totalDiscount += (product.discount / 100) * product.price;
      }
    });

    this.total = newTotal - newTotal * this.tax;
    this.discount = totalDiscount;

    await this.save();
  }
}
