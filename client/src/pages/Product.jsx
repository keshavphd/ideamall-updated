import React, { useEffect, useState } from "react";
import SummaryAPI, { Axios } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import OpenEditProduct from "./OpenEditProduct";
import DeleteProduct from "./DeleteProduct";

const Product = () => {
  const [data, setData] = useState([]);
  const [newPage, setNewPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [searchProduct, setSearchProduct] = useState("");
  const [editProduct, setEditProduct] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(false);
  const [datas, setDatas] = useState();
  const [deleteValue, setDeleteValue] = useState("");

  const getProducts = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryAPI.getProductControl,
        data: {
          page: newPage,
          limit: 12,
          search: searchProduct,
        },
      });
      console.log("kgk", res.data);

      if (res.data.success) {
        setData(res.data.data);
        setTotalPage(res.data.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (newPage !== totalPage) {
      setNewPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (newPage > 1) {
      setNewPage((prev) => prev - 1);
    }
  };

  const handleSearchProduct = (e) => {
    const { value } = e.target;
    setSearchProduct(value);
    setNewPage(1);
  };

  useEffect(() => {
    getProducts();
  }, [newPage]);

  useEffect(() => {
    let flag = true;
    const interval = setTimeout(() => {
      if (flag) {
        getProducts();
        flag = false;
      }
    }, 3000);
    return () => {
      clearTimeout(interval);
    };
  }, [searchProduct]);

  const handleEdit = (value) => {
    setEditProduct(true);
    setDatas(value);
  };

  const handleDelete = (value) => {
    setDeleteProduct(true);
    setDeleteValue(value);
  };
  return (
    <div className="overflow-hidden">
      <div className="flex flex-row justify-between px-3 py-2 mb-1 lg:shadow-md">
        <p className="font-mono text-2xl">Product</p>
        <input
          type="text"
          className="p-2 min-w-[300px] outline-none rounded bg-blue-50"
          placeholder="Find product here"
          value={searchProduct}
          onChange={handleSearchProduct}
        />
      </div>

      <div className="grid grid-cols-2 gap-1 min-h-[55vh] bg-orange-200 p-3 mx-auto md:grid-cols-4 lg:grid-cols-6">
        {data.map((curElem, index) => {
          return (
            <div
              key={index}
              className="p-2 mx-auto bg-white lg:max-h-[190px] rounded lg:w-28 md:w-32 w-36"
            >
              <div className="flex flex-col justify-between gap-0">
                <img
                  src={curElem?.image[0]}
                  alt="image"
                  className="object-cover w-full h-full"
                />
                <p className="font-medium leading-4 text-center line-clamp-2">
                  {curElem?.name}
                </p>
                <p className="text-center text-slate-300">{curElem?.unit}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => handleEdit(curElem)}
                    className="px-1 border border-green-300 rounded bg-green-50 hover:bg-green-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(curElem._id)}
                    className="px-1 border border-red-300 rounded bg-red-50 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between px-4">
        <button
          onClick={handlePrevious}
          className={`${
            newPage === 1 ? `bg-slate-200 cursor-not-allowed` : `bg-orange-600`
          } px-2 py-1 text-white border`}
        >
          Previous
        </button>
        <div>
          {loading ? (
            <Loading />
          ) : (
            <p>
              {newPage}/{totalPage}
            </p>
          )}
        </div>
        <button
          onClick={handleNext}
          className={`${
            newPage === totalPage
              ? `bg-slate-200 cursor-not-allowed`
              : `bg-orange-600`
          } px-3 py-1 text-white border`}
        >
          Next
        </button>
      </div>
      {editProduct && (
        <OpenEditProduct
          close={() => setEditProduct(false)}
          fetchProducts={getProducts}
          datas={datas}
        />
      )}
      {deleteProduct && (
        <DeleteProduct
          close={() => setDeleteProduct(false)}
          fetchProducts={getProducts}
          _id={deleteValue}
        />
      )}
    </div>
  );
};
export default Product;
