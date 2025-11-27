import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  modelName: 'obras_sociales',
})
export class ObrasSocialesModel extends Model<ObrasSocialesModel> {
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
  public nombre: string;
}

export default ObrasSocialesModel;
