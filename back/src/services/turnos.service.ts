import { TimeLike } from 'fs';
import { TurnosModel } from '../models';

const getTurnoById = async (turnoId: string): Promise<TurnosModel> => {
  const turno = await TurnosModel.findOne({ where: { id: turnoId } });

  return turno;
};

const getAllTurnos = async () => {
  const turnos = await TurnosModel.findAll();

  return turnos;
};

const createTurno = async (
  nombre_paciente: string,
  telefono: string,
  email: string,
  obra_social_id: number,
  fecha: Date | string,
  hora: TimeLike,
  estado: string,
) => {
  const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;

  // fecha local string YYYY-MM-DD
  const yyyy = fechaObj.getFullYear();
  const mm = String(fechaObj.getMonth() + 1).padStart(2, '0');
  const dd = String(fechaObj.getDate()).padStart(2, '0');
  const fechaLocal = `${yyyy}-${mm}-${dd}`;

  // hora local string HH:MM:SS desde fechaObj
  const hh = String(fechaObj.getHours()).padStart(2, '0');
  const min = String(fechaObj.getMinutes()).padStart(2, '0');
  const horaLocal = `${hh}:${min}:00`;

  const created = await TurnosModel.create({
    nombre_paciente,
    telefono,
    email,
    obra_social_id: obra_social_id.toString(),
    fecha: fechaLocal,
    hora: horaLocal,
    estado,
  });
  return created;
};

const updateEstadoTurno = async (turnoId: string, estado: string) => {
  await TurnosModel.update({ estado }, { where: { id: turnoId } });
  const updated = await TurnosModel.findOne({ where: { id: turnoId } });
  return updated;
};

const deleteTurno = async (turnoId: string) => {
  const deletedTurno = await TurnosModel.destroy({ where: { id: turnoId } });
};

export const turnosService = {
  getTurnoById,
  getAllTurnos,
  createTurno,
  deleteTurno,
  updateEstadoTurno,
};
