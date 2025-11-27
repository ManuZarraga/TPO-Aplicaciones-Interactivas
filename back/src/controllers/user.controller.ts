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

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userService.createUser(req.body.name, req.body.email);

    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const userController = {
  getUserById,
  createUser,
  getAllUsers,
};
