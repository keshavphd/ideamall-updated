import Cart from "../models/cartModel.js";
import User from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;
    if (!productId) {
      return res.status(402).json({
        msg: "Provide productID",
        error: true,
        success: false,
      });
    }

    const checkCart = await Cart.findOne({
      userId: userId,
      productId: productId,
    });

    // if(checkCart){
    //   return res.json({
    //     success:true,
    //     msg:"Item already in cart"
    //   })
    // }

    const cartItem = new Cart({
      quantity: 1,
      userId: userId,
      productId: productId,
    });

    const save = await cartItem.save();

    const updateCartUser = await User.updateOne(
      { _id: userId },
      { $push: { shopping_cart: productId } }
    );
    res.status(200).json({
      data: save,
      msg: "Item added successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return res.json({
      msg: "Unable to add Cart",
      error: true,
      success: false,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id, quantity } = req.body;

    if (!_id || !quantity) {
      return res.status(400).json({
        msg: "Please provide token",
      });
    }

    const updateCartItems = await Cart.updateOne(
      { _id: _id, userId: userId },
      { quantity: quantity }
    );

    res.status(200).json({
      msg: "Items addeds successfully",
      success: true,
      error: false,
      data: updateCartItems,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Unable to add Cart",
      error: true,
      success: false,
    });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const userId = req.userId;
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).json({
        msg: "Please provide aeid",
      });
    }

    const deleteCartItm = await Cart.deleteOne({_id:_id,userId:userId});
    res.status(200).json({
      msg: "Items deleted successfully",
      success: true,
      error: false,
      data: deleteCartItm,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Unable to delete Cart",
      error: true,
      success: false,
    });
  }
};

const getCartItems = async (req, res) => {
  try {
    const userId = req.userId;
    const cartItem = await Cart.find({ userId: userId }).populate("productId");
    res.status(200).json({
      data: cartItem,
      error: false,
      success: true,
    });
  } catch (error) {
    return res.json({
      msg: "Unable to fetch Cart",
      error: true,
      success: false,
    });
  }
};

export default { addToCart, getCartItems, updateCart,deleteCartItems };
