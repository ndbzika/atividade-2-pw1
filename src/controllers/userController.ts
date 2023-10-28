import { Request, Response } from "express";
import { userService } from "../services/userService";

const index = async (req: Request, res: Response) => {
  const users = await userService.findAllUsers();
  return res.json(users);
};

const show = async (req: Request, res: Response) => {
  const { username } = req.headers;
  const user = await userService.findUserByUsername(username as string);
  return res.json(user);
};

const store = async (req: Request, res: Response) => {
  const createdUser = await userService.createUser(req.body);
  return res.status(201).json(createdUser);
};

export const userController = {
  index,
  show,
  store,
};
