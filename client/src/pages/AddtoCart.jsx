import React, { useEffect, useState } from "react";
import SummaryAPI, { Axios } from "../utils/axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";

const AddtoCart = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cart.cart);
  const [isInCart, setIsInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [cartItemDetail, setCartItemDetail] = useState();
  const { fetchCartItems, updateCardItems,deleteCartQuantitys } = useGlobalContext();
  const handleAddtoCrt = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryAPI.addToCart,
        data: {
          productId: data?._id,
        },
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        if (fetchCartItems) {
          fetchCartItems();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkingItem = cartItem.some(
      (item) => item.productId?._id === data?._id
    );
    setIsInCart(checkingItem);
    const findProduct = cartItem.find(
      (item) => item.productId?._id === data?._id
    );
    setQuantity(findProduct?.quantity);
    setCartItemDetail(findProduct);
  }, [data, cartItem]);

  const increaseQuantity = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await updateCardItems(cartItemDetail?._id, quantity + 1);
    if(res.success){
      toast.success("Item added")
    }
  };
  const decreaseQuantity = async(e) => {
    e.preventDefault();
    e.stopPropagation();
    if(quantity === 1){
     return deleteCartQuantitys(cartItemDetail?._id)
    }
    const res = await updateCardItems(cartItemDetail?._id, quantity - 1);
    if(res.success){
      toast.success("Item removed")
    }
  };

  return (
    <div className="w-full max-w-44">
      {isInCart ? (
        <div className="flex">
          <button
            onClick={decreaseQuantity}
            className="p-1 bg-orange-400 rounded"
          >
            <FaMinus />
          </button>
          <p className="px-1 text-center">{quantity}</p>
          <button
            onClick={increaseQuantity}
            className="p-1 bg-orange-400 rounded"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddtoCrt}
          className="px-2 py-1 text-white bg-green-600 lg:px-4"
        >
          {loading ? <Loading /> : "Add"}
        </button>
      )}
    </div>
  );
};

export default AddtoCart;
