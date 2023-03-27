import { Router } from "express";
import * as controller from "./controller";

const router = Router();
router.get("/", (_req, res) => {
  res.json({ message: "api running bitches" });
});

router.get("/progress", controller.getProgress);
router.get("/winners", controller.getWinners);
router.post("/upload", controller.uploadEntry);

export default router;
