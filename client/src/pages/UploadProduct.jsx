import React, { useState } from "react";
import { PiUploadSimpleBold } from "react-icons/pi";
import SummaryAPI, { Axios } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { MdDelete } from "react-icons/md";
import ViewImage from "./ViewImage";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import OpenAddNewField from "./OpenAddNewField";
import sweetAlert from "./Alert";

const UploadProduct = () => {
  const [data, setData] = useState({
    name: "",
    image: [],
    category: [],
    subCategory: [],
    unit: "",
    stock: "",
    price: "",
    discount: "",
    description: "",
    more_details: {},
  });
  const [iamge, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [viewImage, setViewImage] = useState(false);
  const [defaultSubCategory, setDefaultCategory] = useState();
  const [openAddNewField, setOpenAddNewField] = useState(false);
  const [addNewFieldName, setAddNewFieldName] = useState("");

  const allCategory = useSelector((state) => state.product.allCategory);

  const allSubCategory = useSelector((state) => state.product.allSubCategory);

  const handleName = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("productImage", file);
    try {
      setImageLoading(true);
      const response = await Axios({
        ...SummaryAPI.uploadProductImage,
        data: formData,
      });
      if (response.data.success) {
        toast.success(response.data.msg);
      }
      setData((prev) => {
        return {
          ...prev,
          image: [...prev.image, response.data.url],
        };
      });
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setImageLoading(false);
    }
  };

  const handleViewImage = (value) => {
    setViewImage(true);
    setImage(value);
  };

  const handleDeleteImage = async (value) => {
    data.image.splice(value, 1);
    setData((prev) => {
      return {
        ...prev,
      };
    });
  };

  const removeCategory1 = (value) => {
    const notRemoved = data.category.filter((a1) => a1._id !== value);
    setData((prev) => {
      return {
        ...prev,
        category: notRemoved,
      };
    });
  };

  const handleTarget1 = (e) => {
    const value = e.target.value;
    const categoryValue = allCategory.find((a1) => a1._id == value);

    setData((prev) => {
      return {
        ...prev,
        category: [...prev.category, categoryValue],
      };
    });
    setDefaultCategory("");
  };

  /***************/
  const handleTarget2 = (e) => {
    const value = e.target.value;
    const subCategoryValue = allSubCategory.find((a1) => a1._id == value);

    setData((prev) => {
      return {
        ...prev,
        subCategory: [...prev.subCategory, subCategoryValue],
      };
    });
    setDefaultCategory("");
  };
  const removeCategory2 = (value) => {
    const notRemoved = data.subCategory.filter((a1) => a1._id !== value);
    setData((prev) => {
      return {
        ...prev,
        subCategory: notRemoved,
      };
    });
  };

  const addMoreField = () => {
    setOpenAddNewField(true);
  };

  const handleAddNewField = () => {
    setData((prev) => {
      return {
        ...prev,
        more_details: {
          ...prev.more_details,
          [addNewFieldName]: "",
        },
      };
    });
    setAddNewFieldName("");
    setOpenAddNewField(false);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryAPI.addProduct,
        data: data,
      });

      if (res.data.success) {
        sweetAlert({ text:"", title: "" });
        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="">
      <div className="z-0 flex flex-row justify-between px-3 py-2 mb-1 font-mono lg:sticky top-20 lg:shadow-md">
        <div className="text-2xl">Upload Product</div>
      </div>

      {viewImage && (
        <ViewImage data={iamge} close={() => setViewImage(false)} />
      )}
      {openAddNewField && (
        <OpenAddNewField
          value={addNewFieldName}
          onChange={(e) => setAddNewFieldName(e.target.value)}
          close={() => setOpenAddNewField(false)}
          submit={handleAddNewField}
        />
      )}
      <div className="p-3">
        <form onSubmit={formSubmit} className="grid w-full gap-2">
          <div className="grid gap-1">
            <label className="text-xl" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter the name of product"
              value={data.name}
              onChange={handleName}
              required
              className="p-1.5 border rounded outline-none bg-blue-50 focus-within:border-orange-400"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-xl" htmlFor="description">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              name="description"
              placeholder="Enter the description of product"
              value={data.description}
              onChange={handleName}
              required
              multiple
              rows={4}
              className="p-1.5 border rounded outline-none resize-none bg-blue-50 focus-within:border-orange-400"
            />
          </div>
          <div>
            <p className="mb-1 text-xl">Image</p>
            <label
              htmlFor="uploadImage"
              className="flex items-center justify-center h-24 border rounded bg-slate-300"
            >
              {imageLoading ? (
                <Loading />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <PiUploadSimpleBold size={26} />
                  <p>Upload Image</p>
                </div>
              )}

              <input
                type="file"
                id="uploadImage"
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
                required
              />
            </label>
          </div>
          <div className="z-0 flex flex-wrap mx-1">
            {data.image.map((img, inx) => {
              return (
                <div
                  key={inx}
                  className="relative z-0 w-20 h-20 mb-1 mr-1 border cursor-pointer min-w-20 group"
                >
                  <img
                    onClick={() => handleViewImage(img)}
                    src={img}
                    alt="Image"
                    className="object-scale-down w-full h-full "
                  />
                  <div
                    onClick={() => handleDeleteImage(inx)}
                    className="absolute bottom-0 right-0 hidden p-2 bg-red-600 group-hover:block rounded-tl-3xl"
                  >
                    <MdDelete />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid gap-1">
            <label className="text-xl">Category</label>
            <div>
              <select
                value={defaultSubCategory}
                onChange={handleTarget1}
                className="w-full p-1.5 border rounded bg-blue-50"
              >
                <option value="">Select Category</option>
                {allCategory.map((curElem, index) => {
                  return (
                    <option value={curElem._id} key={index}>
                      {curElem.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.category.map((curElem, index) => {
              return (
                <div
                  key={index}
                  className="flex bg-white gap-1 p-0.5 shadow-md"
                >
                  <div>{curElem.name}</div>
                  <div
                    onClick={() => removeCategory1(curElem._id)}
                    className="mt-1.5 text-black hover:text-blue-500 cursor-pointer"
                  >
                    <IoClose />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid gap-1">
            <label className="text-xl">Sub Category</label>
            <div>
              <select
                value={defaultSubCategory}
                onChange={handleTarget2}
                className="w-full p-1.5 border rounded bg-blue-50"
              >
                <option value="">Select SubCategory</option>
                {allSubCategory.map((curElem, index) => {
                  return (
                    <option value={curElem._id} key={index}>
                      {curElem.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.subCategory.map((curElem, index) => {
              return (
                <div key={index} className="flex gap-1 p-0.5 shadow-md">
                  <div>{curElem.name}</div>
                  <div
                    onClick={() => removeCategory2(curElem._id)}
                    className="mt-1.5 text-black hover:text-blue-500 cursor-pointer"
                  >
                    <IoClose />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid gap-1">
            <label className="text-xl" htmlFor="unit">
              Unit
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              placeholder="Enter the unit of product"
              value={data.unit}
              onChange={handleName}
              required
              className="p-1.5 border rounded outline-none bg-blue-50 focus-within:border-orange-400"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-xl" htmlFor="stock">
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              placeholder="Enter the stock of product"
              value={data.stock}
              onChange={handleName}
              required
              className="p-1.5 border rounded outline-none bg-blue-50 focus-within:border-orange-400"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-xl" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Enter the price of product"
              value={data.price}
              onChange={handleName}
              required
              className="p-1.5 border rounded outline-none bg-blue-50 focus-within:border-orange-400"
            />
          </div>
          <div className="grid gap-1">
            <label className="text-xl" htmlFor="discount">
              Discount
            </label>
            <input
              type="number"
              id="discount"
              name="discount"
              placeholder="Enter the discount of product"
              value={data.discount}
              onChange={handleName}
              required
              className="p-1.5 border rounded outline-none bg-blue-50 focus-within:border-orange-400"
            />
          </div>

          <div>
            {Object.keys(data?.more_details).map((curElem, index) => (
              <div className="mb-2" key={index}>
                <div key={index} className="grid gap-1">
                  <label className="text-xl" htmlFor={curElem}>
                    {curElem}
                  </label>
                  <input
                    type="text"
                    id={curElem}
                    name={curElem}
                    placeholder={`Enter the ${curElem} of product`}
                    value={data?.more_details[curElem]}
                    onChange={(e) => {
                      const value = e.target.value;
                      setData((prev) => {
                        return {
                          ...prev,
                          more_details: {
                            ...prev.more_details,
                            [curElem]: value,
                          },
                        };
                      });
                    }}
                    required
                    className="p-1.5 border rounded outline-none bg-blue-50 focus-within:border-orange-400"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 cursor-pointer">
            <div
              onClick={addMoreField}
              className="inline w-auto px-4 py-1.5 rounded border border-orange-400 hover:bg-orange-500"
            >
              Add more fields
            </div>
          </div>
          <div></div>
          <button className="py-1 text-xl bg-orange-500 rounded" type="submit">
            {loading ? <Loading /> : "Submit"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadProduct;
