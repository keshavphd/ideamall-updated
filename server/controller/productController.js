import uploadImageCloudinary from "../middleware/uploadImageCloudinary.js";
import Product from "../models/uploadProductModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = req.body;
    const productCreated = await Product.create({
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    });
    res.status(200).json({
      msg: "Product Added Successfully",
      error: false,
      success: true,
      data: productCreated,
    });
  } catch (error) {
    return res.json({
      msg: "Unable to add Product",
      error: true,
      success: false,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      _id,
      name,
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = req.body;
    const update = await Product.findByIdAndUpdate(
      _id,
      {
        name,
        image,
        category,
        subCategory,
        unit,
        stock,
        price,
        discount,
        description,
        more_details,
      },
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

const getProductbyCategory = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.json({
        msg: "Please provide id",
        error: true,
        success: false,
      });
    }
    const productFetched = await Product.find({ category: { $in: id } }).limit(
      19
    );

    return res.status(200).json({
      msg: "Category fetch successfully",
      error: false,
      success: true,
      data: productFetched,
    });
  } catch (error) {
    return res.json({
      msg: error.message || error,
      error: true,
      success: false,
    });
  }
};

// const getProduct = async(req,res)=>{
//   try {
//     const totalProduct = await Product.find();
//     res.status(200).json({
//       msg: "Data derived succesfully",
//       error: false,
//       success: true,
//       data:totalProduct
//     });
//   } catch (error) {
//     return res.json({
//       msg: "Unable to drive data",
//       error: true,
//       success: false,
//     });
//   }
// }

const getProductControl = async (req, res) => {
  try {
    let { page, limit, search } = req.body;
    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }

    // {
    //   $text: {
    //     $search: <string>,
    //     $language: <string>,
    //     $caseSensitive: <boolean>,
    //     $diacriticSensitive: <boolean>
    //   }
    // }

    const query = search
      ? {
          $text: {
            $search: search,
            $caseSensitive: false,
          },
        }
      : {};

    const skip = (page - 1) * limit;
    const [data, totalCount] = await Promise.all([
      Product.find(query)
        .sort({ _id: -1 })
        .skip(skip)
        .limit(limit)
        .populate("category subCategory"),
      Product.countDocuments(query),
    ]);
    console.log("hi", query);

    return res.json({
      message: "Derived Successfull total",
      error: false,
      success: true,
      totalCount: totalCount,
      totalPage: Math.ceil(totalCount / limit),
      data: data,
    });
  } catch (error) {
    return res.json({
      msg: "Unable to load product",
      error: true,
      success: false,
    });
  }
};

const getProductbyCategoryandSubCategory = async (req, res) => {
  try {
    let { categoryID, subCategoryID, page, limit } = req.body;
    if (!categoryID || !subCategoryID) {
      return res.status(400).json({
        msg: "Provide Ids",
        error: true,
        success: false,
      });
    }
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 10;
    }

    const skip = (page - 1) * limit;

    const query = {
      category: { $in: categoryID },
      subCategory: { $in: subCategoryID },
    };

    const [data, totalCount] = await Promise.all([
      Product.find(query).sort({ _id: -1 }).skip(skip).limit(limit),
      Product.countDocuments(query),
    ]);
    return res.json({
      msg: "product list",
      data: data,
      totalCount: totalCount,
      page: page,
      limit: limit,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(400).json({
      msg: "Unable to fetch list",
      error: true,
      success: false,
    });
  }
};

const addUploadImage = async (req, res) => {
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

const findProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const productFound = await Product.find({ _id: id });

    return res.json({
      msg: "Product successfully fetched",
      error: false,
      success: true,
      data: productFound,
    });
  } catch (error) {
    return res.json({
      msg: "Unable to find Product",
      error: true,
      success: false,
    });
  }
};

const searchProduct = async(req,res)=>{
  try {
    let {search,page,limit}= req.body;
    if(!page){
      page=1;
    }
    if(!limit){
      limit = 10;
    }
    const query = search ? {$text:{$search:search}}:{}
    const skip = (page-1)*limit;
    const [data,dataCount] = await Promise.all([Product.find(query).sort( { _id: -1 }).skip(skip).limit(limit).populate('category subCategory'),Product.countDocuments(query)])
    res.status(200).json({
      msg: "product daata",
      error: false,
      success: true,
      data:data,
      totalPage:Math.ceil(dataCount/limit),
      totalCount:dataCount,
      limit:limit,
      page:page
    });
  } catch (error) {
    return res.json({
      msg: "Unable to find Product",
      error: true,
      success: false,
    });
  }
}

const deleteProduct = async(req,res)=>{
  try {
    const _id = req.body;
    const deleteProduct = await Product.findByIdAndDelete(_id);
    res.status(200).json({
      msg:'User Deleted Successfully',
      success:true,
      error:false,
      data:deleteProduct
    })
  } catch (error) {
    return res.json({
      msg: "Unable to delete Product",
      error: true,
      success: false,
    });
  }

}

export default {
  addUploadImage,
  addProduct,
  getProductControl,
  getProductbyCategory,
  getProductbyCategoryandSubCategory,
  findProduct,
  updateProduct,
  deleteProduct,
  searchProduct
};
