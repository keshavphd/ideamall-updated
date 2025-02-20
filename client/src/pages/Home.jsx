import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reduceUrl } from "./SortUrl";
import CategorywiseProduct from "./CategorywiseProduct";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const webImage = "https://i.ibb.co/mbLnPdh/banner.jpg";
  const mobileImage = "https://i.postimg.cc/RV0wNLLs/banner-mobile.jpg";
  const categoryData = useSelector((state) => state.product.allCategory);

  const subCategoryData = useSelector((state) => state.product.allSubCategory);
  const navigate = useNavigate();
  const handleProductDetail = (id, name) => {
    const subCategory = subCategoryData.find((dta) =>
      dta.category.find((a) => a._id == id)
    );

    // {
    // const filtrDart = dta.category.some((vlue) => {
    //   return vlue._id == id;
    // });

    // return filtrDart ? true : null;

    const url = `/${reduceUrl(name)}-${id}/${reduceUrl(subCategory.name)}-${
      subCategory._id
    }`;
    // console.log(url);
    navigate(url);
    console.log("hey",subCategory);
  };

  return (
    <section className={` bg-white `}>
      <div className="container mx-auto mb-4">
        <div
          className={`w-full bg-orange-100 lg:block hidden rounded ${
            !webImage ? "animate-pulse " : " bg-orange-100"
          } min-h-48`}
        >
          <img
            src={webImage}
            alt="Image"
            className="hidden w-full h-full lg:block"
          />
        </div>
        <div
          className={`w-full block  bg-orange-100 lg:hidden rounded ${
            !mobileImage ? "animate-pulse " : " bg-orange-100"
          } min-h-72`}
        >
          <img
            src={mobileImage}
            alt="Image"
            className="block w-full h-full lg:hidden"
          />
        </div>
        <div className="container grid grid-cols-4 gap-1 px-4 mx-auto md:grid-cols-7 lg:grid-cols-10">
          {!loadingCategory
            ? new Array(20).fill(null).map((a, index) => {
                return (
                  <div
                    key={index}
                    className="grid gap-2 p-4 bg-white rounded shadow-sm cursor-pointer min-h-36 animate-pulse"
                  >
                    <div className="bg-orange-100 rounded min-h-24"></div>
                    <div className="h-8 bg-orange-100 rounded"></div>
                  </div>
                );
              })
            : categoryData.map((curElem, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-full "
                    onClick={() =>
                      handleProductDetail(curElem._id, curElem.name)
                    }
                  >
                    <div>
                      
                      <img
                        src={curElem.image}
                        alt="Images"
                        className="object-scale-down w-full h-full"
                      />
                    </div>
                  </div>
                );
              })}
        </div>
        {categoryData.map((curElem, index) => {
          return (
            <CategorywiseProduct
              key={index}
              id={curElem?._id}
              name={curElem?.name}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Home;
