import { Router } from "express";
import { technologyController } from "../controllers/technologyController";
import { checkExistsUserAccount } from "../utils/checkExistsUserAccount";

const router = Router();

router.get("/", checkExistsUserAccount, technologyController.index);
router.post("/", checkExistsUserAccount, technologyController.store);

export default router;
