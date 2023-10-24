import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { Cart, Product } from '.';

@Table({
  timestamps: false,
  tableName: 'cart_items'
})
export default class CartItem extends Model {
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  cart_id!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  product_id!: number;

  @BelongsTo(() => Cart)
  cart!: Cart;

  @BelongsTo(() => Product)
  product!: Product;

  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  quantity!: number;
}
