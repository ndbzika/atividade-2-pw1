import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";

export const checkExistsUserAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.headers;
  await userService.findUserByUsername(username as string);
  next();
};
