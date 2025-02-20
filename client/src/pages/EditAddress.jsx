import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SummaryAPI, { Axios } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../provider/GlobalProvider";

const EditAddress = ({ close, values }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      _id: values._id,
      userId: values.userId,
      addresses: values.addresses,
      city: values.city,
      state: values.state,
      pincode: values.pincode,
      contry: values.contry,
      mobile: values.mobile,
    },
  });
  const { fetchAllAddress } = useGlobalContext();

  const dataSubmit = async (daaatas) => {
    try {
      const res = await Axios({
        ...SummaryAPI.updateAddress,
        data: {
          ...daaatas,
          addresses: daaatas.addresses,
          city: daaatas.city,
          state: daaatas.state,
          contry: daaatas.contry,
          pincode: daaatas.pincode,
          mobile: daaatas.mobile,
        },
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        if (close) {
          fetchAllAddress();
          close();
          reset();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 z-50 h-screen overflow-auto bg-opacity-90 bg-neutral-950">
      <div className="w-full max-w-lg p-4 mx-auto mt-10 bg-white rounded">
        <div className="flex justify-between gap-5">
          <h2 className="font-semibold cursor-pointer">Edit Address</h2>
          <button onClick={close}>
            <IoClose size={25} />
          </button>
        </div>

        <form onSubmit={handleSubmit(dataSubmit)} className="grid gap-4 mt-4">
          <div className="grid gap-1">
            <label htmlFor="addresses">Address Line : </label>
            <input
              type="text"
              id="addresses"
              className="p-2 border rounded bg-orange-50"
              {...register("addresses", { required: true })}
            />
            <label htmlFor="city">City : </label>
            <input
              type="text"
              id="city"
              className="p-2 border rounded bg-orange-50"
              {...register("city", { required: true })}
            />

            <label htmlFor="state">State : </label>
            <input
              type="text"
              id="state"
              className="p-2 border rounded bg-orange-50"
              {...register("state", { required: true })}
            />
            <label htmlFor="pincode">Pincode : </label>
            <input
              type="text"
              id="pincode"
              className="p-2 border rounded bg-orange-50"
              {...register("pincode", { required: true })}
            />
            <label htmlFor="contry">Country : </label>
            <input
              type="text"
              id="contry"
              className="p-2 border rounded bg-orange-50"
              {...register("contry", { required: true })}
            />
            <label htmlFor="mobile">Mobile Number : </label>
            <input
              type="text"
              id="mobile"
              className="p-2 border rounded bg-orange-50"
              {...register("mobile", { required: true })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold bg-yellow-400 hover:bg-yellow-500"
          >
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditAddress;
