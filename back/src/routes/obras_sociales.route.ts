import { Router } from 'express';
import { obrasSocialesController } from '../controllers/obras_sociales.controller';

const router: Router = Router();

router.route('/:obraId').get(obrasSocialesController.getObraById);
router.route('/').get(obrasSocialesController.getAllObrasSociales);
router.route('/').post(obrasSocialesController.createObraSocial);
router.route('/:obraSocialId').delete(obrasSocialesController.deleteObraSocial);

export const obrasSocialesRouter: Router = router;
