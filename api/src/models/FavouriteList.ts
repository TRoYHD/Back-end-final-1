import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  BelongsToMany
} from 'sequelize-typescript';
import { Product, User } from './';

@Table({
  timestamps: true,
  tableName: 'favourite_lists'
})
export default class FavouriteList extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  })
  user_id!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  })
  product_id!: number;
}
