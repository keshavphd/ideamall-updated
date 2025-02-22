import React, { useState } from "react";
import DisplayPriceinRuppee from "./DisplayPriceinRuppee";
import { useGlobalContext } from "../provider/GlobalProvider";
import AddNewAddress from "./AddNewAddress";
import { useSelector } from "react-redux";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import EditAddress from "./EditAddress";
import DeleteAddress from "./DeleteAddress";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryAPI, { Axios } from "../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CheckOutPage = () => {
  const { totalPrice, totalQuantity, fetchCartItems,fetchORder } = useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const allAddress = useSelector((state) => state?.address?.toalAddress);
  const [selectOneAddress, setSelectOneAddress] = useState(0);
  const [editAddress, setEditAddress] = useState(false);
  const [editAddressData, setEditAddressData] = useState({});
  const [deleteAddress, setDeleteAddress] = useState(false);
  const navigate = useNavigate();

  const itemsInCart = useSelector((state) => state?.cart?.cart);
  const codCall = async () => {
    try {
      const res = await Axios({
        ...SummaryAPI.coderCod,
        data: {
          listItems: itemsInCart,
          totalAmount: totalPrice,
          addressId: allAddress[selectOneAddress]?._id,
          subTotalAmount: totalPrice,
        },
      });
      if (res.data.msg) {
        toast.success(res?.data?.msg);
        if (fetchCartItems) {
          fetchCartItems();
        }
        if(fetchORder){
          fetchORder()
        }
        navigate("/successes", {
          state: {
            text: "Ordered",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const onlinePaymnet = async () => {
    try {
      toast.loading("loading...")
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublicKey);

      const res = await Axios({
        ...SummaryAPI.paymentUrl,
        data: {
          listItems: itemsInCart,
          totalAmount: totalPrice,
          addressId: allAddress[selectOneAddress]?._id,
          subTotalAmount: totalPrice,
        },
      });
      const data = stripePromise.redirectToCheckout({ sessionId: res.data.id });
      console.log("ssdfg",data);
      
      if (fetchCartItems) {
        fetchCartItems();
      }
      if(fetchORder){
        fetchORder()
      }
      toast.dismiss();
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-neutral-100">
      <div className="container flex flex-col justify-between w-full gap-6 p-3 mx-auto lg:flex-row">
        <div className="w-full">
          <h2 className="text-lg font-semibold">Choose your address</h2>
          <div className="flex flex-col gap-2 p-2 bg-white">
            {allAddress?.map((addr, index) => (
              <label key={index + "54234"} htmlFor={"address" + index}>
                <div className="flex gap-5 p-2 border hover:bg-orange-100 border-neutral-200">
                  <div className="flex">
                    <input
                      type="radio"
                      id={"address" + index}
                      value={index}
                      onChange={(e) => setSelectOneAddress(e.target.value)}
                      name="addressess"
                    />
                  </div>
                  <div>
                    <p>{addr?.addresses}</p>
                    <p>{addr?.city}</p>
                    <p>{addr?.state}</p>
                    <p>
                      {addr?.contry}-{addr?.pincode}
                    </p>
                    <p>{addr?.mobile}</p>
                  </div>
                  <div className="flex flex-col justify-center gap-4 ml-auto">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setEditAddress(true);
                        setEditAddressData(addr);
                      }}
                      className="px-2 bg-orange-300 rounded hover:text-white hover:bg-orange-600"
                    >
                      <MdEdit size={26} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setDeleteAddress(true);
                        setEditAddressData(addr?._id);
                      }}
                      className="px-2 bg-red-300 rounded hover:text-white hover:bg-red-600"
                    >
                      <AiFillDelete size={26} />
                    </button>
                  </div>
                </div>
              </label>
            ))}
            <div
              onClick={() => setOpenAddress(true)}
              className="flex items-center justify-center border-2 border-current cursor-pointer hover:text-white hover:bg-orange-400 h-14 bg-orange-50"
            >
              {allAddress?.length !== 0 ? "Add More Addresses" : "Add Address"}
            </div>
          </div>
        </div>
        <div className="w-full px-2 py-3 bg-white lg:max-w-md">
          <h2 className="text-lg font-semibold">Summary</h2>
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
          <div className="flex flex-col w-full gap-2 lg:max-w-md">
            <button
              onClick={onlinePaymnet}
              className="px-4 py-2 font-semibold text-white bg-orange-500 hover:bg-orange-700"
            >
              Online Payment
            </button>
            <button
              onClick={codCall}
              className="px-4 py-2 font-semibold text-orange-500 border-2 border-orange-500 hover:text-white hover:bg-orange-700"
            >
              Cash on Delivery
            </button>
          </div>
          <div className="mt-7 text-neutral-300">useThisCardDetail : 4000003560000008 </div>
        </div>
      </div>
      {openAddress && <AddNewAddress close={() => setOpenAddress(false)} />}
      {editAddress && (
        <EditAddress
          close={() => setEditAddress(false)}
          values={editAddressData}
        />
      )}
      {deleteAddress && (
        <DeleteAddress
          close={() => setDeleteAddress(false)}
          value={editAddressData}
        />
      )}
    </section>
  );
};

export default CheckOutPage;
