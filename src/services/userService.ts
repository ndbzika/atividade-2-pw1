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

export const userService = {
  UserExists,
  findUserById,
  findUserByUsername,
  findAllUsers,
  createUser,
};
