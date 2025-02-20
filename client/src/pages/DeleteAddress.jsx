import React from "react";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryAPI, { Axios } from "../utils/axios";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";

const DeleteAddress = ({ close, value }) => {
  const { fetchAllAddress } = useGlobalContext();
// console.log("trg",value);

  const handleDelete = async () => {
    try {
      const res = await Axios({
        ...SummaryAPI.deleteAddress,
        data: {_id:value},
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        fetchAllAddress();
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-opacity-50 bg-neutral-900">
      <div className="w-full max-w-lg mx-1 bg-white rounded-sm">
        <div className="flex p-2 ">
          <div className="font-semibold">Are you sure to delete</div>
          <button
            className="block ml-auto font-semibold text-black w-fit"
            onClick={close}
          >
            <IoClose size={25} />
          </button>
        </div>
        <div className="flex justify-end w-full gap-3 p-2">
          <button className="px-2 py-1 border border-orange-200 rounded hover:text-neutral-50 hover:bg-orange-600" onClick={close}>Cancel</button>
          <button className="px-2 py-1 bg-green-300 rounded hover:text-neutral-50 hover:bg-green-600" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAddress;
