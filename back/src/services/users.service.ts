import { UsersModel } from '../models';

const getUserById = async (userId: string): Promise<UsersModel> => {
  const user = await UsersModel.findOne({ where: { id: userId } });

  return user;
};

const getUserByEmail = async (email: string): Promise<UsersModel | null> => {
  const user = await UsersModel.findOne({ where: { email } });
  return user;
};

const getAllUsers = async () => {
  const users = await UsersModel.findAll();
  return users;
};

const createUser = async (name: string, email: string) => {
  const user = await UsersModel.create({ name, email });
};

export const userService = {
  getUserById,
  getUserByEmail,
  createUser,
  getAllUsers,
};
