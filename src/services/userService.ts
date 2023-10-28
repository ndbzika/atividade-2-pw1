import { PrismaClient } from "@prisma/client";
import { UserDTO } from "../dtos/userDTO";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../helpers/api-errors";

const prisma = new PrismaClient();

const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw new InternalServerError("Internal Server Error");
  }
  return user;
};

const findUserByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) {
    throw new NotFoundError("User Not Found");
  }
  return user;
};

const findAllUsers = async () => {
  return await prisma.user.findMany();
};

const UserExists = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (user) {
    return true;
  }
  return false;
};

const createUser = async (user: UserDTO) => {
  if (await UserExists(user.username)) {
    throw new BadRequestError("User Already Exists");
  }
  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      name: user.name,
    },
  });
  if (!newUser) {
    throw new InternalServerError("Internal Server Error");
  }
  return newUser;
};

export const userService = {
  UserExists,
  findUserById,
  findUserByUsername,
  findAllUsers,
  createUser,
};
