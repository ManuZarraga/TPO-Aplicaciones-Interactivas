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
    if ((error as any)?.code === 'DUPLICATE' || (error as any)?.message === 'DUPLICATE') {
      return res.status(409).send({ error: 'Obra social ya existe' });
    }
    next(error);
  }
};

const updateNombreObraSocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { nombre } = req.body;
    if (typeof nombre === 'undefined') {
      return res.status(400).send({ error: 'Falta el campo "nombre" en el body' });
    }

    const updatedObra = await obrasSocialesService.updateNombreObraSocial(req.params.obraId, nombre);
    res.send(updatedObra);
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
  updateNombreObraSocial,
  deleteObraSocial,
};
