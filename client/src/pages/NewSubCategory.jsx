import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import SummaryAPI, { Axios } from "../utils/axios";
import { useSelector } from "react-redux";

const NewSubCategory = ({ close, fetchData }) => {
  const [loading, setLoading] = useState(false);
  const [newLoading, setNewLoading] = useState(false);
  const [defaultSubCategory, setDefaultCategory] = useState();
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const allCategory = useSelector((state) => state.product.allCategory);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        name: value,
      };
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("subCategoryImage", file);
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.uploadSubCategoryImage,
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setNewLoading(true);
      const res = await Axios({
        ...SummaryAPI.addSubCategory,
        data: data,
      });
      if (res.data.success) {
        toast.success(res.data.msg);
        fetchData();
        // close();
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setNewLoading(false);
    }
  };

  const handleCloseOptions = (value) => {
    const array = data.category.filter((data) => data._id !== value);
    setData((prev) => {
      return {
        ...prev,
        category: array,
      };
    });
  };

  return (
    <>
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
                    alt="SubCategoryImage"
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
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>
            </div>

            <div className="grid gap-1 mt-2 ">
              <label htmlFor="selectcate">Select Category</label>
              <div className="border rounded focus-within:border-orange-400">
                <div className="flex flex-wrap gap-1 ">
                  {data.category.map((curElem, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row mx-1 mb-0.5 border shadow-md"
                      >
                        <div className="cursor-default">{curElem.name}</div>
                        <div
                          onClick={() => handleCloseOptions(curElem._id)}
                          className="mt-0.5 text-black cursor-pointer"
                        >
                          <IoClose size={20} />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <select
                  name="selectcate"
                  className="w-full p-1.5 outline-none"
                  value={defaultSubCategory}
                  onChange={(e) => {
                    const value = e.target.value;
                    const categoryValue = allCategory.find(
                      (e1) => e1._id == value
                    );
                    setData((prev) => {
                      return {
                        ...prev,
                        category: [...prev.category, categoryValue],
                      };
                    });
                    setDefaultCategory("");
                  }}
                >
                  <option value="">Select Category</option>
                  {allCategory.map((curElem, index) => {
                    return (
                      <option value={curElem?._id} key={index}>
                        {curElem?.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <button
              disabled={!(data.image && data.name && data.category)}
              type="submit"
              className={`${
                data.name && data.image && data.category
                  ? "bg-orange-500"
                  : " bg-slate-500"
              } justify-center w-full mt-4 lg:mt-2 ${
                !(data.image && data.name && data.category)
                  ? "cursor-not-allowed"
                  : "cursor-pointer "
              } p-1.5 text-center  rounded`}
            >
              {newLoading ? "adding to subcategory..." : "Add SubCategory"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewSubCategory;
