import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";

export const checkExistsUserAccount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.headers;
  const user = userService.findUserByUsername(username as string);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  next();
};
