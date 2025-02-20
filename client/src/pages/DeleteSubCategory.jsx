import toast from "react-hot-toast";
import SummaryAPI, { Axios } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import { IoClose } from "react-icons/io5";
const DeleteSubCategory = ({ close, datas, fetchData }) => {
  const data = { _id: datas._id };

  const handleDelete = async () => {
    try {
      const response = await Axios({
        ...SummaryAPI.deleteSubCategory,
        data: data,
      });
      if (response.data.success) {
        toast.success(response?.data?.msg);
        fetchData();
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full px-1 py-40 rounded bg-neutral-700 bg-opacity-45">
      <div className="w-full max-w-lg p-2 bg-white rounded ">
        <div className="flex flex-row justify-between w-full pb-2">
          <div className="font-semibold">Are you sure to delete ?</div>
          <button className="block ml-auto text-black w-fit" onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <div className="w-full mx-auto mt-8 ml-auto text-right">
          <button
            onClick={close}
            className="px-6 py-1 mr-3 border border-orange-500 rounded hover:bg-orange-500"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-1 bg-orange-500 border border-orange-500 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteSubCategory;
