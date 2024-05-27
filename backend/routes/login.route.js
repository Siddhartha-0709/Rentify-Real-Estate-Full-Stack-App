import { Router } from "express";
import { loginSeller } from "../controllers/seller.controller.js";
const router = Router();

router.route("/seller-login").post(loginSeller);

export default router;