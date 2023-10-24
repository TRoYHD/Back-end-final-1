import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  HasMany,
  BelongsToMany
} from 'sequelize-typescript';
import {
  Category,
  Brand,
  ProductImages,
  FavouriteList,
  CartItem,
  User
} from './';

@Table({
  timestamps: true,
  tableName: 'products'
})
export default class Product extends Model {
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
  color!: string;

  @Column({
    type: DataType.DOUBLE(5, 2),
    allowNull: false
  })
  price!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: 0
  })
  discount!: number;

  @Column({
    type: DataType.DOUBLE(3, 1),
    allowNull: false
  })
  rating!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  })
  isLimited!: boolean;
  
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0
  })
  stock!: number;
  
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  category_id!: number;

  @ForeignKey(() => Brand)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  brand_id!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @BelongsTo(() => Brand)
  brand!: Brand;

  @HasMany(() => ProductImages)
  images!: ProductImages[];

  public async addImage(imageUrl: string): Promise<ProductImages> {
    const image = new ProductImages({ image: imageUrl });

    image.product_id = this.id;
    await image.save();
    this.images.push(image);

    return image;
  }

  @BelongsToMany(() => User, () => FavouriteList)
  users!: User[];

  @HasMany(() => CartItem)
  cartItems!: CartItem[];
}
