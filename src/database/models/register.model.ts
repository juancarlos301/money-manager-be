import { Table, Model, Column, DataType } from 'sequelize-typescript';

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

  @Column({
    type: DataType.STRING(100),
  })
  declare category: string;

  @Column({
    type: DataType.STRING(50),
  })
  declare purpuse: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare value: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: true,
  })
  declare deleted: Boolean;
}
export default Register;
