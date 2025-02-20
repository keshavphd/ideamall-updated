// import Category from "../models/categoryModel.js";

// const addCategory = async (req, res) => {
//   try {
//     const { name, image } = req.body;
//     if (!name || !image) {
//       return res.json({
//         msg: "Please Both the Items",
//         error: true,
//         success: false,
//       });
//     }
//     const categoryCreated = await Category.create(req.body);
//     res.status(200).json({
//       msg: "Uploaded Successfully",
//       data: categoryCreated,
//       error: false,
//       success: true,
//     });
//   } catch (error) {
//     res.status(400).json({
//       msg: "Unable to upload category image",
//       error: true,
//       success: false,
//     });
//   }
// };

// export default addCategory;

import uploadImageCloudinary from "../middleware/uploadImageCloudinary.js";
import Category from "../models/categoryModel.js";
import Product from "../models/uploadProductModel.js";
import SubCategory from "../models/subCategoryModel.js";

const addCategory = async (req, res) => {
  try {
    const { name, image } = req.body;
    if (!name || !image) {
      return res.json({
        msg: "Enter in both the field",
        success: false,
        error: true,
      });
    }
    const categoryCreated = await Category.create({ name, image });
    res.status(200).json({
      msg: "Category Added Successfully",
      error: false,
      success: true,
      data: categoryCreated,
    });
  } catch (error) {
    return res.json({
      msg: "Unable to add Category",
      error: true,
      success: false,
    });
  }
};

const addCategoryImage = async (req, res) => {
  try {
    const file = req.file;

    const upload = await uploadImageCloudinary(file);
    res.status(200).json({
      msg: "Image Uploaded Successfully",
      error: false,
      success: true,
      url: upload.url,
    });
  } catch (error) {
    return res.json({
      msg: "Unable to add Image",
      error: true,
      success: false,
    });
  }
};

const getCategoryDetail = async (req, res) => {
  try {
    const category = await Category.find().sort({ _id: -1 });
    res.status(200).json({
      msg: "Category fetching completed",
      error: false,
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Unable to fetch details",
      error: true,
      success: false,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const _id = req.body;
    const checkSubCategory = await SubCategory.find({
      category: { $in: [_id] },
    }).countDocuments();

    const checkProduct = await Product.find({
      category: { $in: [_id] },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return res.status(400).json({
        msg: "Category already in use",
        error: true,
        success: false,
      });
    }

    const delCategory = await Category.deleteOne({ _id: _id });
    res.status(200).json({
      msg: "Deleted Successfully",
      error: false,
      success: true,
      data: delCategory,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Unable to delete",
      error: true,
      success: false,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { _id, name, image } = req.body;
    const update = await Category.findByIdAndUpdate(
      _id,
      { name, image },
      { new: true }
    );
    res.status(200).json({
      msg: "Updated successfully",
      error: false,
      success: true,
      data: update,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Unable to update",
      error: true,
      success: false,
    });
  }
};

export default {
  addCategory,
  addCategoryImage,
  deleteCategory,
  getCategoryDetail,
  updateCategory,
};
