import { Router } from 'express';
import { userRouter } from './user.route';
import { obrasSocialesRouter } from './obras_sociales.route';
import { turnosRouter } from './turnos.route';
import { authRouter } from './auth.route';

const router: Router = Router();

router.use('/users', userRouter);
router.use('/obras_sociales', obrasSocialesRouter);
router.use('/turnos', turnosRouter);
router.use('/auth', authRouter);

export const v1: Router = router;
