import { Router } from "express";
import { checkExistsUserAccount } from "../middlewares/checkExistsUserAccount";
import { userController } from "../controllers/userController";

const router = Router();

router.get("/", userController.index);
router.post("/", userController.store);
router.get("/:username", checkExistsUserAccount, userController.show);

export default router;
