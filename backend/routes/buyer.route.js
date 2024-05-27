import { Router } from "express";
import { addToInterestedProperties, getPropertyDetails, loginBuyer, registerBuyer, toggleLikeProperty, viewBuyerProfile, viewProperties } from "../controllers/buyer.controller.js";
const router = Router();

router.route("/register-buyer").post(registerBuyer);
router.route("/login-buyer").post(loginBuyer);
router.route("/view-properties").get(viewProperties);
router.route("/add-to-interest").post(addToInterestedProperties);
router.route("/like-property").post(toggleLikeProperty);
router.route("/view-profile").post(viewBuyerProfile);
router.route("/get-property-details").get(getPropertyDetails);


export default router;