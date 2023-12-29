import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'Categories',
  modelName: 'Category',
})
class Category extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @Column({
    type: DataType.STRING(100),
  })
  declare name: string;

  @Column({
    type: DataType.STRING(100),
  })
  declare icon: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare purpose: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare deleted: Boolean;
}
export default Category;
