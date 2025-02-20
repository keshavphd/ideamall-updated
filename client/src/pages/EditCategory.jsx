import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import SummaryAPI, { Axios } from "../utils/axios";
import { useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import { useDispatch } from "react-redux";
import { setAllCategory } from "../app/productSlice.jsx";

const EditCategory = ({ close, categoryData }) => {
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [data, setData] = useState({
    _id: categoryData._id,
    name: categoryData.name,
    image: categoryData.image,
  });
  
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("categoryImage", file);
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.uploadCategoryImage,
        data: formData,
      });
      if (response.data.success) {
        toast.success(response.data.msg);
      }
      setData((prev) => {
        return {
          ...prev,
          image: response.data.url,
        };
      });
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const response = await Axios({
        ...SummaryAPI.updateCategory,
        data: data,
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setSubmitLoading(false);
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full px-1 py-40 rounded bg-neutral-700 bg-opacity-45">
      <div className="flex flex-col w-full max-w-lg p-2 bg-white rounded">
        <div className="flex flex-row justify-between w-full pb-2">
          <div className="font-semibold">Category</div>
          <button className="block ml-auto text-black w-fit" onClick={close}>
            <IoClose size={25} />
          </button>
        </div>
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={data.name}
              className="p-1 bg-gray-400 border rounded outline-none focus-within:border-yellow-500 bg-opacity-35"
              placeholder="Enter the name of Category"
              onChange={handleInputChange}
            />
          </div>
          <div>Image</div>
          <div className="flex flex-col gap-2 sm:items-center lg:flex-row">
            <div className="flex items-center justify-center w-full border lg:w-36 h-36 text-zinc-500 bg-slate-300">
              {data.image ? (
                <img
                  src={data.image}
                  alt="Image"
                  className="object-scale-down w-full h-full"
                />
              ) : (
                <p>No image</p>
              )}
            </div>
            <label htmlFor="image">
              <div className="justify-center w-full cursor-pointer lg:mt-0 p-1.5 text-center border border-orange-400 rounded hover:bg-orange-500">
                {loading ? "uploading..." : "Upload Image"}
              </div>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>
          <button
            disabled={!(data.image && data.name)}
            type="submit"
            className={`${
              data.name && data.image ? "bg-orange-500" : " bg-slate-500"
            } justify-center w-full mt-4 lg:mt-2 ${
              !(data.image && data.name)
                ? "cursor-not-allowed"
                : "cursor-pointer "
            } p-1.5 text-center  rounded`}
          >
            {submitLoading ? "updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default EditCategory;
