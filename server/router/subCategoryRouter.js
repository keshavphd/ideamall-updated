import { Router } from "express";
import subCategoryController from "../controller/subCategoryController.js";
import upload from "../middleware/multer.js";
import auth from "../middleware/auth.js";

const router = Router();
router
  .route("/add-subcategory")
  .post(auth, subCategoryController.addSubCategory);
router
  .route("/add-subcategory-image")
  .post(
    auth,
    upload.single("subCategoryImage"),
    subCategoryController.addSubCategoryImage
  );
router
  .route("/subcategory-detail")
  .get(subCategoryController.getSubCategory);
  router
  .route("/delete-subcategory")
  .delete(auth, subCategoryController.deleteSubCategory);

  router
  .route("/get-all-related-subcategory")
  .post(subCategoryController.getAllSubCategory);

router
  .route("/update-subcategory")
  .put(auth, subCategoryController.updateSubCategory);
export default router;
