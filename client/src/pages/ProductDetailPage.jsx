import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SummaryAPI, { Axios } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import { useSelector } from "react-redux";
import DisplayPriceinRuppee from "./DisplayPriceinRuppee";
import { reduceUrl } from "./SortUrl";
import AddtoCart from "./AddtoCart";

const ProductDetailPage = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [subCategoryData, setSubCategoryData] = useState([]);
  const categoryID = params.category.split("-").slice(-1)[0];
  const getAllSubCategory = useSelector(
    (state) => state.product.allSubCategory
  );

  // console.log("fg", params);
  const subCateName = params.subcategory.split("-");
  const nameSub = subCateName.slice(0, subCateName.length - 1).join(" ");

  const subCategoryID = params.subcategory.split("-").slice(-1)[0];
  const fetchAllSubCategory = () => {
    const allSubCategory = getAllSubCategory.filter((category) =>
      category.category.some((cid) => cid._id === categoryID)
    );
    setSubCategoryData(allSubCategory)
  };
// console.log("wertfwe",nameSub);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryAPI.getProductbyCategoryandSubCategory,
        data: {
          categoryID: categoryID,
          subCategoryID: subCategoryID,
          page: page,
          limit: 10,
        },
      });
      // console.log("sdf", res.data);

      if (res.data.success) {
        if (res.data.page == 1) {
          setData(res.data.data);
        } else {
          setData([...data, ...res.data.data]);
        }
        setTotalPage(res.data.totalCount);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchAllSubCategory = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await Axios({
  //       ...SummaryAPI.getAllRelatedSubCategory,
  //       data: {
  //         id: categoryID,
  //       },
  //     });
  //     // console.log("hid",res);
  //    if(res.data.success){
  //     setSubCategoryData(res.data.data)
  //    }
  //   } catch (error) {
  //     AxiosToastError(error)
  //   }
  // };

  useEffect(() => {
    fetchProductData();
    fetchAllSubCategory();
  }, [params, getAllSubCategory]);
console.log("dfgrfg",data);

  return (
    <section className="container sticky mx-auto top-20 lg:top-20">
      <div className="container top-20 grid grid-cols-[90px,1fr] md:grid-cols-[200px,1fr] lg:grid-cols[280px,1fr]">
        <div className="bg-white w-full overflow-y-scroll scrollBarRemove py-2  shadow-md max-h-[78vh] min-h-[78vh]">
          <div className="">
            {subCategoryData.map((curElem, index) => {
              const link = `/${reduceUrl(curElem.category[0].name)}-${curElem.category[0]._id}/${reduceUrl(curElem.name)}-${
                curElem._id
              }`;
              return (

               <Link key={index+"wertf"} to={link} className={`box-border items-center w-full p-2  border-b lg:w-full lg:h-16 lg:flex cursor-pointer hover:bg-orange-100 ${subCategoryID === curElem._id ?"bg-orange-100":"" } lg:gap-4`}>
                  <div className="box-border mx-auto bg-white rounded max-w-28 w-fit lg:mx-0">
                    <img src={curElem.image} alt="Image" 
                    className="object-scale-down h-full lg:h-14 lg:w-12 w-14"/>
                  </div>
                  <p className="-mt-6 text-xs text-center lg:text-base lg:mt-0">{curElem.name}</p>
               </Link>
              );
            })}
          </div>
        </div>
        
        <div className="w-full shadow-sm overflow-y-scroll  mx-auto scrollBarRemove max-h-[78vh] min-h-[78vh]">
        <div className="w-full sticky top-0 z-20 p-1.5 pl-3 text-lg font-semibold bg-white shadow-md">{nameSub}</div>
        <div className="grid gap-4 px-8 mx-auto mt-2 md:grid-cols-2 lg:grid-cols-4">
        {/* <div className="flex flex-col justify-around w-full gap-4 m-2 lg:flex-wrap lg:flex-row "> */}
          { data.map((data,index)=>{
              const url = `/product/${reduceUrl(data.name)}-${data._id}`;
            
            return(
              <div key={index+"dwf"} className="w-full bg-white min-w-52 lg:min-w-52 max-w-52">
                 <Link to={url} className="grid gap-1 py-2 border rounded lg:gap-3 lg:p-4 min-w-36 lg:min-w-52 max-w-52">
              <div className="w-full overflow-hidden rounded min-h-20 max-h-24 lg:max-h-32">
                <img
                  src={data.image[0]}
                  alt="Image"
                  className="object-scale-down w-full h-full lg:scale-125 "
                />
              </div>
              <div className="p-[1px] px-2 text-xs text-orange-500 bg-orange-100 rounded w-fit">
                0 min
              </div>
              <div className="px-2 text-sm font-medium lg:px-0 lg:text-base text-ellipsis line-clamp-2">{data.name}</div>
              <div className="px-2 text-sm lg:px-0 w-fit lg:text-base">{data.unit}</div>
              <div className="flex items-center justify-between gap-1 px-2 lg:gap-3 lg:px-0">
                <div className="font-semibold">{DisplayPriceinRuppee(data.price)}</div>
                <div className="">
           <AddtoCart data={data}/>
          </div>
              </div>
            </Link>
              </div>
             
            )
          }) }
       
        </div>
        </div>
       
      </div>
    </section>
  );
};

export default ProductDetailPage;
