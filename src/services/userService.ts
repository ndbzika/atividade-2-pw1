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

const UserExists = (username: string) => {
  const user = findUserByUsername(username);
  if (user) {
    return true;
  }
  return false;
};

const createUser = (user: UserDTO) => {
  db.push(user);
  return true;
};

const updateUser = (id: string, user: UserDTO) => {
  if (!UserExists(user.username)) {
    return false;
  }
  const index = db.findIndex((currentId) => currentId.id === id);
  db[index] = user;
  return true;
};

const deleteUser = (id: string) => {
  const index = db.findIndex((currentId) => currentId.id === id);
  db.splice(index, 1);
  return true;
};

export const userService = {
  UserExists,
  findUserById,
  findUserByUsername,
  findAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
