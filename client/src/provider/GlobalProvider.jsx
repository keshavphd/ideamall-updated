import { createContext, useContext, useEffect, useState } from "react";
import SummaryAPI, { Axios } from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { handleAddCart } from "../app/cartSlice";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { handleAddAddress } from "../app/addressSlice";
import { setOredrs } from "../app/orderSlice";

export const GlobleContxt = createContext(null);

export const useGlobalContext = () => useContext(GlobleContxt);
const GlobalProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const cartItem = useSelector((state) => state?.cart.cart);
  const user = useSelector((state) => state?.user);
  const fetchCartItems = async () => {
    try {
      const res = await Axios({
        ...SummaryAPI.getCartItem,
      });
      if (res.data.success) {
        // console.log(res.data);
        dispatch(handleAddCart(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCardItems = async (id, quantity) => {
    try {
      const res = await Axios({
        ...SummaryAPI.updateCartQuantity,
        data: {
          _id: id,
          quantity: quantity,
        },
      });

      if (res.data.success) {
        // toast.success(res.data.msg);
        fetchCartItems();
        return res.data;
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const deleteCartQuantitys = async (crtId) => {
    try {
      const res = await Axios({
        ...SummaryAPI.deleteCartQuantity,
        data: {
          _id: crtId,
        },
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        fetchCartItems();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const fetchAllAddress = async () => {
    try {
      const res = await Axios({
        ...SummaryAPI.getAddress,
      });
      if (res.data.success) {
        dispatch(handleAddAddress(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(handleAddCart([]));
  };

  const fetchORder = async () => {
    try {
      const res = await Axios({
        ...SummaryAPI.getOrdersDetails,
      });
      // console.log("res",res);
      if (res.data.success) {
        dispatch(setOredrs(res.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.name) {
      fetchORder();
      fetchCartItems();
      // handleLogout();
      fetchAllAddress();
    }
  }, [user]);

  useEffect(() => {
    const quantity = cartItem.reduce((prev, curr) => {
      return prev + curr.quantity;
    }, 0);
    //  console.log("hiwer",quantity);
    setTotalQuantity(quantity);

    const totalprice = cartItem.reduce((prev, curr) => {
      return prev + curr.productId.price * curr.quantity;
    }, 0);
    //  console.log(totalPrice);
    setTotalPrice(totalprice);
  }, [cartItem]);

  return (
    <GlobleContxt.Provider
      value={{
        fetchCartItems,
        updateCardItems,
        deleteCartQuantitys,
        totalPrice,
        fetchORder,
        fetchAllAddress,
        totalQuantity,
      }}
    >
      {children}
    </GlobleContxt.Provider>
  );
};

export default GlobalProvider;
