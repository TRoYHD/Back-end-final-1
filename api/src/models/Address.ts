import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import { User } from './';

@Table({
  timestamps: false,
  tableName: 'addresses'
})
export default class Address extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  full_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  mobile_number!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  street!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  state!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  city!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  pin_code!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;
}
