import { ObrasSocialesModel } from '../models';
import { Sequelize } from 'sequelize';

const getObraById = async (obraSocialId: string): Promise<ObrasSocialesModel> => {
  const obraSocial = await ObrasSocialesModel.findOne({ where: { id: obraSocialId } });

  return obraSocial;
};

const getAllObrasSociales = async (): Promise<ObrasSocialesModel[]> => {
  return await ObrasSocialesModel.findAll();
};

const createObraSocial = async (nombre: string): Promise<ObrasSocialesModel> => {
  // comprobar duplicados case-insensitive
  const existing = await ObrasSocialesModel.findOne({
    where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('nombre')), nombre.trim().toLowerCase()),
  });
  if (existing) {
    const err: any = new Error('DUPLICATE');
    err.code = 'DUPLICATE';
    throw err;
  }

  const obraSocial = await ObrasSocialesModel.create({ nombre });
  return obraSocial;
};

const updateNombreObraSocial = async (obraSocialId: string, nombre: string) => {
  await ObrasSocialesModel.update({ nombre }, { where: { id: obraSocialId } });
  const updated = await ObrasSocialesModel.findOne({ where: { id: obraSocialId } });

  return updated;
};

const deleteObraSocial = async (obraSocialId: string): Promise<number> => {
  return await ObrasSocialesModel.destroy({ where: { id: Number(obraSocialId) } });
};

export const obrasSocialesService = {
  getObraById,
  getAllObrasSociales,
  createObraSocial,
  updateNombreObraSocial,
  deleteObraSocial,
};
