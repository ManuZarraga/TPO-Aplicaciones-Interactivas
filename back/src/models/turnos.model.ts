import { Column, ForeignKey, BelongsTo, DataType, Model, Table } from 'sequelize-typescript';
import { ObrasSocialesModel } from './obras_sociales.model';

@Table({
  modelName: 'turnos',
})
export class TurnosModel extends Model<TurnosModel> {
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
  public nombre_paciente: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public telefono: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public email: string;

  @ForeignKey(() => ObrasSocialesModel)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public obra_social_id: string;
  @BelongsTo(() => ObrasSocialesModel, 'obra_social_id')
  public obra_social: ObrasSocialesModel;

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  public fecha: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  public estado: string;
}

export default TurnosModel;
