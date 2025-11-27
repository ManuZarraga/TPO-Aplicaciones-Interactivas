import { TimeLike } from 'fs';
import { TurnosModel } from '../models';
import { sendTurnoReservadoEmail, sendTurnoConfirmadoEmail, sendTurnoCanceladoEmail } from './email.service';

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

  try {
    await sendTurnoReservadoEmail(created);
  } catch (e) {
    console.error('Error enviando mail de turno reservado', e);
  }

  return created;
};

const updateEstadoTurno = async (turnoId: string, estado: string) => {
  const turnoAnterior = await TurnosModel.findOne({ where: { id: turnoId } });

  await TurnosModel.update({ estado }, { where: { id: turnoId } });
  const updated = await TurnosModel.findOne({ where: { id: turnoId } });

  if (turnoAnterior && turnoAnterior.estado === 'Reservado' && estado === 'Confirmado') {
    try {
      await sendTurnoConfirmadoEmail(updated);
    } catch (e) {
      console.error('Error enviando mail de turno confirmado', e);
    }
  }

  return updated;
};

const deleteTurno = async (turnoId: string) => {
  const turno = await TurnosModel.findOne({ where: { id: turnoId } });

  if (!turno) {
    return;
  }
  const estabaReservado = turno.estado === 'Reservado' || turno.estado === 'Confirmado';
  await TurnosModel.destroy({ where: { id: turnoId } });

  if (estabaReservado) {
    try {
      await sendTurnoCanceladoEmail(turno);
    } catch (e) {
      console.error('Error enviando mail de turno cancelado', e);
    }
  }
};

export const turnosService = {
  getTurnoById,
  getAllTurnos,
  createTurno,
  deleteTurno,
  updateEstadoTurno,
};
