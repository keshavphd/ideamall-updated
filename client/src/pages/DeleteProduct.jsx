import React from "react";
import { IoClose } from "react-icons/io5";
import SummaryAPI, { Axios } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

const DeleteProduct = ({ close, fetchProducts, _id }) => {
  const handleDelete = async () => {
    try {
      const deleteProduct = await Axios({
        ...SummaryAPI.deleteProductDetails,
        data: { _id: _id },
      });
      if (deleteProduct.data.success) {
        toast.success(deleteProduct.data.msg);
        fetchProducts();
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center w-full bg-black bg-opacity-45">
      <div className="flex flex-col items-center w-full m-2">
        <div className="w-full max-w-lg px-2 bg-white">
          <div className="flex justify-between ">
            <div className="text-xl font-semibold">Delete Product</div>
            <button onClick={close}>
              <IoClose size={26} className="" />
            </button>
          </div>
          <div className="p-[0.5px] m-1 bg-slate-700"></div>
          <div className="text-lg">Are you sure to delete?</div>
          <div className="flex flex-row justify-end gap-3 pb-2 mt-8">
            <button
              onClick={close}
              className="px-4 py-1.5 text-base border border-green-600 rounded hover:bg-green-600 hover:text-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-1.5 text-base bg-red-400 border rounded text-slate-100 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
