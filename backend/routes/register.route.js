import { Router } from "express";
import { registerNewSeller } from "../controllers/seller.controller.js";
const router = Router();

router.route("/seller-register").post(registerNewSeller);
router.route("/buyer-register").post();

export default router;