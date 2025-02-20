import { Router } from "express";
import addressController from "../controller/addressController.js";
import auth from "../middleware/auth.js";

const router = Router();
router.route("/add-address").post(auth,addressController.addAddress);
router.route("/get-address").get(auth,addressController.getAddress);
router.route("/update-address").put(auth,addressController.updateAddress);
router.route("/delete-address").delete(auth,addressController.deleteAddress);
export default router;