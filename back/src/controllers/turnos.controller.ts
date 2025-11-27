import { Request, Response, NextFunction } from 'express';
import { turnosService } from 'services/turnos.service';

const getTurnoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const turno = await turnosService.getTurnoById(req.params.turnoId);

    res.send(turno);
  } catch (error) {
    next(error);
  }
};

const getAllTurnos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const turnos = await turnosService.getAllTurnos();

    res.send(turnos);
  } catch (error) {
    next(error);
  }
};

const createTurno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nuevoTurno = await turnosService.createTurno(
      req.body.nombre_paciente,
      req.body.telefono,
      req.body.email,
      req.body.obra_social_id,
      new Date(req.body.fecha),
      req.body.hora,
      req.body.estado,
    );
    res.send(nuevoTurno);
  } catch (error) {
    next(error);
  }
};

const deleteTurno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await turnosService.deleteTurno(req.params.turnoId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateEstadoTurno = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { estado } = req.body;
    if (typeof estado === 'undefined') {
      return res.status(400).send({ error: 'Falta el campo "estado" en el body' });
    }

    const updatedTurno = await turnosService.updateEstadoTurno(req.params.turnoId, estado);
    res.send(updatedTurno);
  } catch (error) {
    next(error);
  }
};

export const turnosController = {
  getTurnoById,
  getAllTurnos,
  createTurno,
  deleteTurno,
  updateEstadoTurno,
};
