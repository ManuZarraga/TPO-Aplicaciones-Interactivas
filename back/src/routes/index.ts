import { Router } from 'express';
import { userRouter } from './user.route';
import { obrasSocialesRouter } from './obras_sociales.route';
import { turnosRouter } from './turnos.route';

const router: Router = Router();

router.use('/users', userRouter);
router.use('/obras_sociales', obrasSocialesRouter);
router.use('/turnos', turnosRouter);

export const v1: Router = router;
