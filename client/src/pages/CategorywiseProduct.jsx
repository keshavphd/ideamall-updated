import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryAPI, { Axios } from "../utils/axios";
import Loadingcard from "./Loadingcard";
import CardWithDetails from "./CardWithDetails";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { reduceUrl } from "./SortUrl";


const CategorywiseProduct = ({ id, name }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log(data);
  const containerRefrence = useRef();
  const subCategoryData = useSelector((state) => state.product.allSubCategory);

  const handleScroolLeft = () => {
    containerRefrence.current.scrollLeft -= 200;
  };

  const handleScrofllRight = () => {
    containerRefrence.current.scrollLeft += 200;
  };

  const fetchCategorywiseProduct = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryAPI.getProductbyCategory,
        data: {
          id: id,
        },
      });

      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchCategorywiseProduct();
  }, []);

const handleProductDetail = () => {
    const subCategory = subCategoryData.find((dta) =>
      dta.category.find((a) => a?._id == id)
    );
 
  
  // console.log("higuig",subCategory?.name);
  
    
    const url = `/${reduceUrl(name)}-${id}/${reduceUrl(subCategory?.name)}-${
      subCategory?._id
    }`;
 return url;
  };

  const LoadingCards = new Array(6).fill(null);

  return (
    <div>
      <div className="flex justify-between w-full p-4 ">
        <div className="font-semibold ">{name}</div>
        <Link className="text-blue-500" to={handleProductDetail()}>
          See All
        </Link>
      </div>
      <div className="relative flex items-center">
        <div
          className="container flex gap-4 px-4 mx-auto overflow-x-scroll scrollbar-none lg:overflow-hidden md:gap-6 lg:gap-8 scroll-smooth"
          ref={containerRefrence}
        >
          {loading &&
            LoadingCards.map((curElem, index) => {
              return <Loadingcard key={index} />;
            })}

          {data.map((curElem, index) => {
            return <CardWithDetails data={curElem} key={index} />;
          })}
        </div>
        <div className="container absolute left-0 right-0 justify-between hidden w-full max-w-full px-2 lg:flex">
          <button
            onClick={handleScroolLeft}
            className="relative z-10 p-2 bg-white rounded-full shadow-md"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleScrofllRight}
            className="relative z-10 p-2 bg-white rounded-full shadow-md"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorywiseProduct;
