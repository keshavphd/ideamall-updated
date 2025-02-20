import { Router } from "express";
import auth from "../middleware/auth.js";
import orderController from "../controller/orderController.js";

const router = Router();
router.route("/cod").post(auth, orderController.paymentCod);
router.route("/checkout").post(auth, orderController.paymentOnline);
router.route("/webhook").post(orderController.webhooKstripe);
router.route("/order-lists").get(auth,orderController.getOrderDetails);

export default router;
