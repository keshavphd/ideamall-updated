import { Router } from "express";
import auth from "../middleware/auth.js";
import cartController from "../controller/cartController.js";

const router = Router();
router.route("/create").post(auth,cartController.addToCart);
router.route("/get").get(auth,cartController.getCartItems);
router.route("/update-quantity").put(auth,cartController.updateCart);
router.route("/delete-quantity").delete(auth,cartController.deleteCartItems);
export default router;