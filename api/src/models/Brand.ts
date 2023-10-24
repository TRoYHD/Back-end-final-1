import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import Product from './Product';

@Table({
  timestamps: true,
  tableName: 'brands'
})
export default class Brand extends Model {
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
