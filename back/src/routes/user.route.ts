import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router: Router = Router();

router.route('/:userId').get(userController.getUserById);

export const userRouter: Router = router;
