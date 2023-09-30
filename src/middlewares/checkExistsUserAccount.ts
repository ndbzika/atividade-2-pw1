import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";
import { NotFoundError } from "../helpers/api-errors";

export const checkExistsUserAccount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.headers;
  const user = userService.findUserByUsername(username as string);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  next();
};
