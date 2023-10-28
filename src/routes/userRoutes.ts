import { Router } from "express";
import { checkExistsUserAccount } from "../middlewares/checkExistsUserAccount";
import { userController } from "../controllers/userController";

const router = Router();

router.post("/", userController.store);
router.get("/", checkExistsUserAccount, userController.show);

export default router;
