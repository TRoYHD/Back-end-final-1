import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import Product from './Product';

@Table({
  timestamps: true,
  tableName: 'categories'
})
export default class Category extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  description!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  image!: string;

  @HasMany(() => Product)
  products!: Product[];
}
