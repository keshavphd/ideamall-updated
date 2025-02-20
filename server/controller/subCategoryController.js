import uploadImageCloudinary from "../middleware/uploadImageCloudinary.js";
import SubCategory from "../models/subCategoryModel.js";

const addSubCategory = async (req, res) => {
  try {
    const { name, image, category } = req.body;
    if (!name || !image || !category[0]) {
      return res.json({
        msg: "Enter in all the field",
        success: false,
        error: true,
      });
    }
    const subCategoryCreated = await SubCategory.create({
      name,
      image,
      category,
    });
    res.status(200).json({
      msg: "Sub-Category Added Successfully",
      error: false,
      success: true,
      data: subCategoryCreated,
    });
  } catch (error) {
    return res.json({
      msg: "Unable to add Category",
      error: true,
      success: false,
    });
  }
};
const addSubCategoryImage = async (req, res) => {
  try {
    const file = req.file;

    const upload = await uploadImageCloudinary(file);
    // console.log("hi",upload.url);

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

const updateSubCategory = async (req, res) => {
  try {
    const { _id, name, image, category } = req.body;
   
    const subCategoryUpdated = await SubCategory.findByIdAndUpdate(
      _id,
      { name, image, category },
      { new: true }
    );
    res.status(200).json({
      msg: "Updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Unable to update",
      error: true,
      success: false,
    });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const _id = req.body;
    const deleteSubCate = await SubCategory.findByIdAndDelete(_id);
    res.status(200).json({
      msg: "Deleted Successfully",
      error: false,
      success: true,
      data: deleteSubCate,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Unable to delete",
      error: true,
      success: false,
    });
  }
};

const getSubCategory = async (req, res) => {
  try {
    const getAllSubCategory = await SubCategory.find().sort({ _id: -1 }).populate('category');
    res.status(200).json({
      msg: "SubCategory fetching completed",
      error: false,
      success: true,
      data: getAllSubCategory,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Unable to fetch details",
      error: true,
      success: false,
    });
  }
};

const getAllSubCategory = async (req, res) => {
  try {
    const {id} = req.body;
    const getAllSubCategories = await SubCategory.find({category:{$in:id}}).sort({ _id: -1 }).populate('category');
    res.status(200).json({
      msg: "SubCategory fetching completed",
      error: false,
      success: true,
      data: getAllSubCategories,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Unable to fetch details",
      error: true,
      success: false,
    });
  }
};

export default {
  addSubCategoryImage,
  updateSubCategory,
  addSubCategory,
  getSubCategory,
  deleteSubCategory,
  getAllSubCategory
};
