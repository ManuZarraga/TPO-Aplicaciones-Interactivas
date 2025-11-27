import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  modelName: 'users',
})
export class UsersModel extends Model<UsersModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  public id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  public email: string;
}

export default UsersModel;
