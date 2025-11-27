import { Router } from 'express';
import { userRouter } from './user.route';

const router: Router = Router();

router.use('/users', userRouter);

export const v1: Router = router;
