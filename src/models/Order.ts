import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany
} from 'sequelize-typescript';
import { Cart, User } from './';

@Table({
  timestamps: true,
  tableName: 'orders'
})
export default class Order extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  user_id!: number;

  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  cart_id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'Pending'
  })
  status!: string;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Cart)
  cart!: Cart;
}
