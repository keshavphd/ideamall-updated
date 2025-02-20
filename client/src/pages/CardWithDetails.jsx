import React, { useState } from "react";
import DisplayPriceinRuppee from "./DisplayPriceinRuppee.jsx";
import { reduceUrl } from "./SortUrl.jsx";
import { Link } from "react-router-dom";
import SummaryAPI, { Axios } from "../utils/axios.jsx";
import AxiosToastError from "../utils/AxiosToastError.jsx";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider.jsx";
import AddtoCart from "./AddtoCart.jsx";
const CardWithDetails = ({ data }) => {
  const url = `/product/${reduceUrl(data.name)}-${data._id}`;

  return (
    <Link
      to={url}
      className="grid gap-1 py-2 border rounded lg:gap-3 lg:p-4 min-w-36 lg:min-w-52 max-w-52"
    >
      <div className="w-full overflow-hidden rounded min-h-20 max-h-24 lg:max-h-32">
        <img
          src={data.image[0]}
          alt="Image"
          className="object-scale-down w-full h-full lg:scale-125 "
        />
      </div>
      <div></div>
      <div className="flex gap-1 pl-1">
        <div className="p-[1px] px-2 text-xs text-orange-500 bg-orange-100 rounded w-fit">
          0 min
        </div>
        <div className="p-[1px] px-1 text-xs text-orange-500 bg-orange-100 rounded w-fit">
          {data?.discount}% Discount
        </div>
      </div>

      <div className="px-2 text-sm font-medium lg:px-0 lg:text-base text-ellipsis line-clamp-2">
        {data.name}
      </div>
      <div className="px-2 text-sm lg:px-0 w-fit lg:text-base">
        {data.unit} Units
      </div>
      <div className="flex items-center justify-between gap-1 px-2 lg:gap-3 lg:px-0">
        <div className="font-semibold">{DisplayPriceinRuppee(data.price)}</div>

        {data?.stock != 0 ? (
          <div className="">
           <AddtoCart data={data}/>
          </div>
        ) : (
          <p className="text-sm text-orange-500">Out of stock</p>
        )}
      </div>
    </Link>
  );
};

export default CardWithDetails;
