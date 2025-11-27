import { Request, Response, NextFunction } from 'express';
import { obrasSocialesService } from '../services/obras_sociales.service';

const getObraById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const obra = await obrasSocialesService.getObraById(req.params.obraId);

    res.send(obra);
  } catch (error) {
    next(error);
  }
};

const getAllObrasSociales = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const obras = await obrasSocialesService.getAllObrasSociales();

    res.send(obras);
  } catch (error) {
    next(error);
  }
};

const createObraSocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const obraSocial = await obrasSocialesService.createObraSocial(req.body.nombre);
    res.send(obraSocial);
  } catch (error) {
    next(error);
  }
};

const deleteObraSocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await obrasSocialesService.deleteObraSocial(req.params.obraSocialId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const obrasSocialesController = {
  getObraById,
  getAllObrasSociales,
  createObraSocial,
  deleteObraSocial,
};
