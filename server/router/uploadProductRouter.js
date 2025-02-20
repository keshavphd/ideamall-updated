import { Router } from "express";
import productController from "../controller/productController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const router = Router();
router.route("/add-product").post(auth, productController.addProduct);
router
  .route("/get-product-by-category-and-subcategory")
  .post(productController.getProductbyCategoryandSubCategory);
router
  .route("/get-product-by-category")
  .post(productController.getProductbyCategory);
router
  .route("/get-product-control")
  .post(auth, productController.getProductControl);
router
  .route("/add-product-image")
  .post(auth, upload.single("productImage"), productController.addUploadImage);
router.route("/get-product-details").post(productController.findProduct);
router.route("/update-product-details").put(productController.updateProduct);
router.route("/delete-product-details").delete(productController.deleteProduct);
router.route("/search-products").post(productController.searchProduct);
export default router;
