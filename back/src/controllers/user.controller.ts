import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.getUserById(req.params.userId);

    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getUserById,
};
