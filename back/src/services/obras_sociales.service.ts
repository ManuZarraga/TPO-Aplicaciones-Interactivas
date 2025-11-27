import { ObrasSocialesModel } from '../models';

const getObraById = async (obraSocialId: string): Promise<ObrasSocialesModel> => {
  const obraSocial = await ObrasSocialesModel.findOne({ where: { id: obraSocialId } });

  return obraSocial;
};

const getAllObrasSociales = async (): Promise<ObrasSocialesModel[]> => {
  return await ObrasSocialesModel.findAll();
};

const createObraSocial = async (nombre: string): Promise<ObrasSocialesModel> => {
  const obraSocial = await ObrasSocialesModel.create({ nombre });
  return obraSocial;
};

const deleteObraSocial = async (obraSocialId: string): Promise<number> => {
  return await ObrasSocialesModel.destroy({ where: { id: Number(obraSocialId) } });
};

export const obrasSocialesService = {
  getObraById,
  getAllObrasSociales,
  createObraSocial,
  deleteObraSocial,
};
