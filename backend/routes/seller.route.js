import { Router } from "express";
import { addProperty, deleteProperty, modifyAvailability, sellerPostedProperty } from "../controllers/seller.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();

router.route("/add-property").post(upload.single("image"),addProperty);
router.route("/delete-property").post(deleteProperty);
router.route("/modity-availability").post(modifyAvailability);
router.route("/seller-posted-property").post(sellerPostedProperty);

export default router;