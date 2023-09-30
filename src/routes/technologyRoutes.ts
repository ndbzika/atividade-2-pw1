import { Router } from "express";
import { technologyController } from "../controllers/technologyController";
import { checkExistsUserAccount } from "../middlewares/checkExistsUserAccount";

const router = Router();

router.get("/", checkExistsUserAccount, technologyController.index);
router.post("/", checkExistsUserAccount, technologyController.store);
router.put("/:id", checkExistsUserAccount, technologyController.update);
router.patch(
  "/:id/studied",
  checkExistsUserAccount,
  technologyController.updateStatus
);
router.delete("/:id", checkExistsUserAccount, technologyController.destroy);

export default router;
