import { Router } from 'express';
import { turnosController } from '../controllers/turnos.controller';
import { middlewareController } from '../controllers/middlerare.controller';

const router: Router = Router();

router.route('/:turnoId').get(turnosController.getTurnoById);
router.route('/').get(turnosController.getAllTurnos);
router.route('/').post(turnosController.createTurno);

router.route('/:turnoId').delete(middlewareController.authMiddleware, turnosController.deleteTurno);
router.route('/:turnoId').put(middlewareController.authMiddleware, turnosController.updateEstadoTurno);

export const turnosRouter: Router = router;
