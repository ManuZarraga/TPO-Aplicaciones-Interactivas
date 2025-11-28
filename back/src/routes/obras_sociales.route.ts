import { Router } from 'express';
import { obrasSocialesController } from '../controllers/obras_sociales.controller';
import { middlewareController } from '../controllers/middlerare.controller';

const router: Router = Router();

router.route('/:obraId').get(obrasSocialesController.getObraById);
router.route('/').get(obrasSocialesController.getAllObrasSociales);

router.route('/').post(middlewareController.authMiddleware, obrasSocialesController.createObraSocial);

router
  .route('/:obraSocialId')
  .delete(middlewareController.authMiddleware, obrasSocialesController.deleteObraSocial);

export const obrasSocialesRouter: Router = router;
