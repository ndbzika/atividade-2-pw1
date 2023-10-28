import { UserDTO } from "../dtos/userDTO";

declare global {
  namespace Express {
    interface Request {
      username: string;
    }
  }
}
