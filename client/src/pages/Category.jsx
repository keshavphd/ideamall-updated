import React, { useEffect, useState } from "react";
import OpenNewCategory from "./OpenNewCategory";
import Loading from "./Loading";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";
import AxiosToastError from "../utils/AxiosToastError";
import { getCategoryDetails } from "../utils/axios";

const Category = () => {
  const [newCategory, setNewCategory] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [data, setData] = useState([]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const categoryData = await getCategoryDetails();
      setCategories(categoryData.data.data);
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleCategory = () => {
    setNewCategory(true);
  };

  const handleDelete = (data) => {
    setDeleteCategory(true);
    setData(data);
  };

  const handleEdit = (data) => {
    setEditCategory(true);
    setData(data);
  };
  return (
    <>
      <div className="z-0 flex flex-row justify-between min-w-[300px] overflow-x-auto px-3 py-2 mb-1 font-mono lg:sticky top-20 lg:shadow-md">
        <div className="text-2xl">Category</div>
        <div
          onClick={handleCategory}
          className="p-1 font-sans bg-orange-400 border rounded cursor-pointer hover:bg-yellow-300"
        >
          +Add Category
        </div>
      </div>
      {!categories[0] && !loading && (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <img
            src="https://images.unsplash.com/photo-1640158615573-cd28feb1bf4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bm8lMjBkYXRhJTIwZm91bmR8ZW58MHx8MHx8fDA%3D"
            alt="image"
          />
        </div>
      )}
      {deleteCategory && (
        <DeleteCategory
          categoryData={data}
          fetchCategory={fetchCategory}
          close={() => setDeleteCategory(false)}
        />
      )}
      {editCategory && (
        <EditCategory
          categoryData={data}
          close={() => setEditCategory(false)}
        />
      )}
      {loading && <Loading />}
      {newCategory && (
        <OpenNewCategory
          fetchCategory={fetchCategory}
          close={() => setNewCategory(false)}
        />
      )}
      <div className="grid grid-cols-2 p-4 mx-auto md:grid-cols-4 lg:grid-cols-5">
        {categories.map((curElem, index) => {
          return (
            <div
              key={index}
              className="object-scale-down p-2 mx-auto mb-8 overflow-hidden rounded shadow-md w-36"
            >
              <img
                src={curElem.image}
                alt={curElem.name}
                className="object-scale-down rounded w-36 h-44"
              />
              <div className="flex flex-row justify-between">
                <button
                  onClick={() => handleEdit(curElem)}
                  className="px-2 py-1 text-green-400 border bg-green-50 hover:bg-green-400 hover:text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(curElem)}
                  className="px-2 py-1 text-red-400 border hover:bg-red-400 hover:text-white bg-red-50"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Category;
