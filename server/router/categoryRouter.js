// import { Router } from "express";
// import auth from "../middleware/auth.js";
// import addCategory from "../controller/categoryController.js";

// const router = Router();

// router.route("/add-category").post(auth,addCategory);
// export default router;
import { Router } from "express";
import categoryController from "../controller/categoryController.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = Router();
router.route("/add-category").post(auth, categoryController.addCategory);
router
  .route("/add-category-image")
  .post(
    auth,
    upload.single("categoryImage"),
    categoryController.addCategoryImage
  );
router
  .route("/category-detail")
  .get(categoryController.getCategoryDetail);
router
  .route("/delete-category")
  .delete(auth, categoryController.deleteCategory);
router.route("/update-category").patch(auth, categoryController.updateCategory);

export default router;
