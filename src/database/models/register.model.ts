import { Table, Model, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Category from './category.model';

@Table({
  timestamps: true,
  tableName: 'Registers',
  modelName: 'Register',
})
class Register extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
  })
  declare id: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
  declare category: Number;
  @BelongsTo(() => Category)
  declare category_info: Category;

  @Column({
    type: DataType.STRING(50),
  })
  declare purpose: string;

  @Column({
    type: DataType.STRING,
  })
  declare value: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare deleted: Boolean;
}
export default Register;
