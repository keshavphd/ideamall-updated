import React, { useEffect, useState } from "react";
import NewSubCategory from "./NewSubCategory";
import { getSubCategoryDetails } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";
import { createColumnHelper } from "@tanstack/react-table";
import DisplaySubCategory from "./DisplaySubCategory ";
import ViewImage from "./ViewImage";

const SubCategory = () => {
  const [addSubCategory, setAddSubCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [viewImage, setViewImage] = useState(false);
  const [imageData, setImageData] = useState();
  const columnHelper = createColumnHelper();
  const handleSubCategory = () => {
    setAddSubCategory(true);
  };

  const getSubCategories = async () => {
    try {
      setLoading(true);
      const res = await getSubCategoryDetails();
      setData(res.data.data);
      // console.log("Sub", res.data.data);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleImage = (value) => {
    setImageData(value);
    setViewImage(true);
  };
  useEffect(() => {
    getSubCategories();
  }, []);

  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("image", {
      header: "Image",
      cell: (value) => {
        return (
          <button className="flex mx-auto ju" onClick={() => handleImage(value.cell.row.original.image)}>
            <img
              src={value.cell.row.original.image}
              alt={value.cell.row.original.name}
              className="object-contain w-8 h-9"
            />
          </button>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: "Category",
      cell: (value) => {
        return (
          <div>
            {value.cell.row.original.category.map((curElem, index) => {
              return <p key={index}>{curElem.name}</p>;
            })}
          </div>
        );
      },
    }),
  ];

  return (
    <>
      <div className="z-0 flex flex-row justify-between px-3 py-2 mb-1 font-mono lg:sticky top-20 lg:shadow-md">
        <div className="text-2xl">SubCategory</div>
        <div
          onClick={handleSubCategory}
          className="p-1 font-sans bg-orange-400 border rounded cursor-pointer hover:bg-yellow-300"
        >
          +Add SubCategory
        </div>
      </div>
      {addSubCategory && (
        <NewSubCategory
          fetchData={getSubCategories}
          close={() => setAddSubCategory(false)}
        />
      )}

      {viewImage && (
        <ViewImage close={() => setViewImage(false)} data={imageData} />
      )}
      <div>
        <DisplaySubCategory
          data={data}
          fetchData={getSubCategories}
          column={columns}
        />
      </div>
      {loading && <Loading />}
    </>
  );
};

export default SubCategory;
