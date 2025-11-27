import { Router } from 'express';
import { turnosController } from '../controllers/turnos.controller';

const router: Router = Router();

router.route('/:turnoId').get(turnosController.getTurnoById);
router.route('/').get(turnosController.getAllTurnos);
router.route('/').post(turnosController.createTurno);
router.route('/:turnoId').delete(turnosController.deleteTurno);
router.route('/:turnoId').put(turnosController.updateEstadoTurno);

export const turnosRouter: Router = router;
