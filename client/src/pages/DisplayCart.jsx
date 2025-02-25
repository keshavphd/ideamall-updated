import React from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import DisplayPriceinRuppee from "./DisplayPriceinRuppee";
import { FaChevronRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import AddtoCart from "./AddtoCart";
import toast from "react-hot-toast";

const DisplayCart = ({ close }) => {
  const navigate = useNavigate();
  const { totalPrice, totalQuantity } = useGlobalContext();
  const cartItems = useSelector((state) => state?.cart?.cart);
  //   console.log("sfg", cartItems);
  const userLogged = useSelector((state) => state?.user);
  // console.log("ufgtr", userLogged);

  const redirectToChekout = () => {
    if (userLogged?._id) {
      navigate("/checkout");
      if(close){
        close()
      }
      return;
    }
    toast("login first")
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 z-40 bg-black bg-opacity-65">
      <div className="w-full max-h-screen min-h-screen ml-auto lg:max-w-sm bg-yellow-50">
        <div className="flex justify-between items-center p-1.5 shadow-md">
          <h1 className="text-xl font-semibold">Cart</h1>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={22} />
          </Link>
          <button className="hidden lg:block" onClick={close}>
            <IoClose size={22} />
          </button>
        </div>

        <div className="min-h-[80vh] lg:min-h-[80vh] h-full p-2 flex flex-col gap-3 bg-orange-100 max-h-[calc(100vh-150px)]">
          <div className="flex items-center justify-between px-4 py-2 text-blue-600 bg-blue-100 rounded-full">
            <p>Your Total savings</p>
            <p>{DisplayPriceinRuppee(totalPrice * 0.135)}</p>
          </div>
          <div className="grid overflow-auto rounded-lg">
            {cartItems[0] ? (
              cartItems.map((items, indes) => {
                return (
                  <div
                    key={indes + "vuyfgv"}
                    className="flex w-full gap-4 p-2 bg-white"
                  >
                    <div className="w-16 h-16 border rounded min-h-16 min-w-16 bg-rose-400">
                      <img
                        src={items?.productId?.image[0]}
                        className="object-scale-down"
                        alt="Product Image"
                      />
                    </div>
                    <div className="w-full max-w-sm">
                      <p className="lg:text-xs text-ellipsis line-clamp-2">
                        {items?.productId?.name}
                      </p>
                      <p className="text-sm lg:text-xs text-neutral-500">
                        {items?.productId?.unit} Unit
                      </p>
                      <p className="font-semibold">
                        {DisplayPriceinRuppee(items?.productId?.price)}
                      </p>
                    </div>
                    <div>
                      <AddtoCart data={items?.productId} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="items-center object-cover w-full h-full overflow-hidden">
                <img src="https://i.imgur.com/gSJ3hXx.jpeg" alt="Cart Image" />
                <div className="flex justify-center w-full text-center">
                  <Link
                    onClick={()=>navigate("/")}
                    className="flex justify-center p-2 font-semibold text-center bg-orange-400 w-fit text-neutral-50"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            )}
          </div>
          {
            cartItems[0] && (
                <div className="p-3 bg-neutral-50">
                <h2 className="font-semibold">Bill Details:</h2>
                <div className="flex justify-between ml-1">
                  <p>Total Items</p>
                  <p>
                    <span className="px-1.5 text-neutral-500 line-through">
                      {DisplayPriceinRuppee(totalPrice * 1.135)}
                    </span>
                    <span>{DisplayPriceinRuppee(totalPrice)}</span>
                  </p>
                </div>
                <div className="flex justify-between ml-1">
                  <p>Total Quantity:</p>
                  <p>
                    <span>{totalQuantity} items</span>
                  </p>
                </div>
                <div className="flex justify-between ml-1">
                  <p>Delivery Charge:</p>
                  <p>
                    <span>Free</span>
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="font-bold">Grand Total</p>
                  <p className="font-bold">{DisplayPriceinRuppee(totalPrice)}</p>
                </div>
              </div> 
            )
          }

        </div>
        {cartItems[0] && (
          <div className="p-2">
            <div className="sticky flex items-center justify-between px-4 py-2 font-semibold bg-orange-700 rounded text-neutral-50 bottom-20">
              <div>{DisplayPriceinRuppee(totalPrice)}</div>
              <button
                onClick={redirectToChekout}
                className="flex items-center gap-0"
              >
                <span>Proceed </span>
                <span>
                  <FaChevronRight />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DisplayCart;
