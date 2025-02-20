import Address from "../models/addressModel.js";
import User from "../models/userModel.js";

const addAddress = async (req, res) => {
  try {
    const userID = req.userId;
    const { addresses, city, state, pincode, contry, mobile } = req.body;

    const creteAddress = await Address.create({
      addresses,
      city,
      state,
      pincode,
      contry,
      mobile,
      userId: userID,
    });
    const asUserAddId = await User.findByIdAndUpdate(userID, {
      $push: {
        address_detail: creteAddress._id,
      },
    });
    res.status(200).json({
      data: creteAddress,
      msg: "Address added successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json("Error in fetching Address");
  }
};

const getAddress = async (req, res) => {
  try {
    const userID = req.userId;
    const allAddress = await Address.find({ userId: userID }).sort({ _id: -1 });
    res.status(200).json({
      data: allAddress,
      msg: "Address fetched successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json("Error in fetching Address");
  }
};

const updateAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, addresses, city, state, pincode, contry, mobile } = req.body;
    const updAddress = await Address.updateOne({_id,userId},{
      addresses,
      city,
      state,
      pincode,
      contry,
      mobile,
    });
    res.status(200).json({
      data: updAddress,
      msg: "Address updated successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json("Error in updating Address");
  }
};

const deleteAddress = async(req,res)=>{
  try {
    const userId = req.userId;
    const {_id} = req.body;

    const delAddress = await Address.deleteOne({_id,userId},{status:false})
    res.status(200).json({
      msg: "Address deleted successfully",
      success: true,
      error: false,
      data: delAddress,
    });
  } catch (error) {
    res.status(400).json("Error in deleting Address");
    
  }
}

export default { addAddress, getAddress,updateAddress,deleteAddress };
