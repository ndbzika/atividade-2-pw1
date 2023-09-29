import { db } from "../database/db";
import { UserDTO } from "../dtos/userDTO";

const findUserById = (id: string) => {
  const user = db.find((currentId) => currentId.id === id);
  return user;
};

const findUserByUsername = (username: string) => {
  const user = db.find(
    (currentUsername) => currentUsername.username === username
  );
  return user;
};

const findAllUsers = () => {
  return db;
};

const createUser = (user: UserDTO) => {
  db.push(user);
};

const updateUser = (id: string, user: UserDTO) => {
  const index = db.findIndex((currentId) => currentId.id === id);
  db[index] = user;
};

const deleteUser = (id: string) => {
  const index = db.findIndex((currentId) => currentId.id === id);
  db.splice(index, 1);
};

export const userService = {
  findUserById,
  findUserByUsername,
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
