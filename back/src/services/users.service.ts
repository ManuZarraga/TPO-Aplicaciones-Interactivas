import { plainToClass } from 'class-transformer';
import { UserDTO } from '../types/DTOs';
import { UsersModel } from '../models';

const getUserById = async (userId: string): Promise<UsersModel> => {
  const user = await UsersModel.findOne({ where: { id: userId } });

  return user;
};

const createUser = async () => {
  const user = await UsersModel.create({ name: 'asdsad', email: 'asdsa@ase.com', role: 'sadsad' });
};

export const userService = {
  getUserById,
  createUser,
};
