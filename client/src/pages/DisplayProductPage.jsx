import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryAPI, { Axios } from "../utils/axios";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import DisplayPriceinRuppee from "./DisplayPriceinRuppee";
import AddtoCart from "./AddtoCart";

const DisplayProductPage = () => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [a, setA] = useState(0);
  const [data, setData] = useState({});
  // console.log(params.product.split("-").slice(-1)[0]);
  const scrollImage = useRef();
  const productId = params.product.split("-").slice(-1)[0];

  const scrollRight = () => {
    scrollImage.current.scrollLeft += 90;
  };
  const scrollLeft = () => {
    scrollImage.current.scrollLeft -= 90;
  };

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryAPI.getProductDetails,
        data: {
          id: productId,
        },
      });
      console.log("dfff", res);

      if (res.data.success) {
        setData(res?.data?.data);
        setImage(res?.data?.data[0]?.image[0]);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductDetails();
  }, [a]);
  console.log("dfgf", data[0]?.image[0]);
  return (
    <section className="container grid h-full p-4 mx-auto bg-orange-100 lg:grid-cols-2">
      <div className="">
        <div className="w-full h-full lg:min-h-[60vh] lg:max-h-[60vh] rounded bg-white min-h-52 max-h-52">
          <img
            src={data[0]?.image[a]}
            alt="Image"
            className="object-scale-down w-full h-full bg-white"
          />

          <div className="flex items-center justify-center gap-3 my-2">
            {data[0]?.image?.map((curElem, index) => {
              return (
                <div
                  key={index}
                  onClick={() => setA(index)}
                  className={`w-2 h-2 lg:w-4 lg:h-4 rounded-full ${
                    index === a ? "bg-orange-400" : "bg-orange-200"
                  } `}
                ></div>
              );
            })}
          </div>
        </div>
        <div className="relative grid mt-5">
          <div
            ref={scrollImage}
            className="relative z-20 flex justify-center w-full gap-4 p-4 overflow-x-auto scrollbar-none"
          >
            {data[0]?.image?.map((curElem, index) => {
              return (
                <div key={index} className="w-20 h-20 min-h-20 min-w-20">
                  <img
                    src={curElem}
                    alt=""
                    onClick={() => setA(index)}
                    className="object-scale-down w-full h-full bg-white"
                  />
                </div>
              );
            })}
          </div>
          <div className="absolute items-center justify-between hidden w-full h-full -ml-2 lg:flex">
            <button
              onClick={scrollLeft}
              className="relative z-20 p-1 bg-white rounded-full"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={scrollRight}
              className="relative z-20 p-1 bg-white rounded-full"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div>
        <p className="font-semibold">Description</p>
        <p className="text-base">{data[0]?.description}</p>
      </div>
      <div>
        <p className="font-semibold">Unit</p>
        <p className="text-base">{data[0]?.unit}</p>
      </div>
      {
        data[0]?.more_details && Object.keys(data[0]?.more_details).map((element,index)=>{
          return(
            <>Hi</>
          )
        })
      }
      </div>
   
      <div className="p-4 text-base lg:text-lg">
        <p className="px-2 bg-green-400 rounded-full w-fit">5 min</p>
        <h2 className="text-xl font-semibold lg:text-3xl">{data[0]?.name}</h2>
        <p >{data[0]?.unit} Unit</p>
        <div className="p-[0.5px] bg-slate-300 my-2"> </div>
        <div>
          
          <p>Price</p>
          <div className="flex ">
          <div className="px-2.5 py-1 border border-green-600 rounded w-fit">
          <p className="text-lg font-semibold lg:text-xl">{DisplayPriceinRuppee(data[0]?.price)}</p>
          </div>
          <div className="px-2.5 py-1 ">
          <p className="font-bold text-orange-950">{data[0]?.discount}% Discount</p>

          </div>
          </div>
          
          
        </div>
        {
  data?.stock !=0 ? (<div className="py-3">
    <AddtoCart data={data[0]}/>
   </div>):(<p className="text-sm text-orange-500">Out of stock</p>)
}
      
        <p className="font-semibold">Why Choose Us?</p>
        <div className="flex items-center h-20 gap-3 ">
          <img src="data:image/png;base64,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" alt="Image" className="w-20 h-20 rounded-full"/>
          <div>
          <p>Doorstep Delivery in minutes</p>
          <p>We provide well enhanced free delivery in minutes</p>
          </div>
        
        </div>
        <p className="mt-2 font-semibold">Why Shop from IdeaMall?</p>
        <div className="flex items-center h-20 gap-3">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDHEqWuIuGRxOYvIHk-jRfYRWMHe1Fq_6wCA&s" alt="" className="w-20 h-20 rounded-full"/>
          <div>
          <p>Doorstep Delivery in minutes</p>
          <p>We provide well enhanced free delivery in minutes</p>
          </div>
        </div>
        <p className="mt-2 font-semibold">We provides best price</p>
        <div className="flex items-center h-20 gap-3">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS8SjxdThaxfgT2ePq-FRfImubBMDeGgYrsQ&s" alt="" className="w-20 h-20 rounded-full"/>
          <div>
          <p>Doorstep Delivery in minutes</p>
          <p>We provide well enhanced free delivery in minutes</p>
          </div>
        </div>
        <p className="mt-2 font-semibold">Get Assure Cashback</p>
        <div className="flex items-center h-20 gap-3">
          <img src="data:image/jpeg;base64,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" alt="" className="w-20 h-20 rounded-full"/>
          <div>
          <p>Doorstep Delivery in minutes</p>
          <p>We provide well enhanced free delivery in minutes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DisplayProductPage;