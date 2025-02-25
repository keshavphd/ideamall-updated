import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayPriceinRuppee from "./DisplayPriceinRuppee";
import { FaCaretRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const DisplayMobileCart = () => {
  const { totalPrice, totalQuantity } = useGlobalContext();
  const cartItems = useSelector(state => state.cart.cart)

  return (
    <>
    {
        cartItems[0]&&(  <div className="sticky p-4 bottom-4">
            <div className="flex items-center justify-between gap-10 px-2 py-1 text-sm bg-orange-500 rounded lg:hidden text-neutral-100">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-600 rounded w-fit">
                  <FaShoppingCart size={26}/>
                </div>
                <div className="text-xs">
                  <p>{totalQuantity} items</p>
                  <p>{DisplayPriceinRuppee(totalPrice)}</p>
                </div>
              </div>
              <Link to={"/cart"} className="flex flex-row items-center justify-center gap-1">
                <span className="text-base font-semibold">View Cart</span>
                <span className="mt-1">
                <FaCaretRight />
                </span>
                
              </Link>
            </div>
          </div>)
    }
    </>
  
  );
};

export default DisplayMobileCart;
