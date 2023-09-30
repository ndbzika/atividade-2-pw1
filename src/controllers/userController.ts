import { Request, Response } from "express";
import { userService } from "../services/userService";
import { v4 as uuid } from "uuid";
import { BadRequestError } from "../helpers/api-errors";

const index = (req: Request, res: Response) => {
  const users = userService.findAllUsers();
  return res.json(users);
};

const show = (req: Request, res: Response) => {
  const { username } = req.params;
  const user = userService.findUserByUsername(username);
  return res.json(user);
};

const store = (req: Request, res: Response) => {
  const { name, username, technologies } = req.body;
  const user = {
    id: uuid(),
    name,
    username,
    technologies: technologies || [],
  };
  const createdUser = userService.createUser(user);
  if (!createdUser) {
    throw new BadRequestError("User already exists");
  }
  return res.status(201).json(user);
};

export const userController = {
  index,
  show,
  store,
};
