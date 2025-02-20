import React, { useEffect, useState } from "react";
import Loadingcard from "./Loadingcard";
import SummaryAPI, { Axios } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import { useLocation } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component"
import CardWithDetails from "./CardWithDetails";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const loadingArrayCard = new Array(10).fill(null);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const params = useLocation();
  console.log("hi", params);
  const [page, setPage] = useState(1);
  const searchTxt = params?.search?.slice(3);
  const searchData = async () => {
    try {
      setLoading(true);
      const res = await Axios({
        ...SummaryAPI.searchProduct,
        data: {
          search: searchTxt,
          page: page,
        },
      });
      console.log("hhi",res);
      if (res.data.success) {
        if (res.data.page == 1) {
          setData(res.data.data);
        } else {
          setData((prev) => {
            return [...prev, ...res.data.data];
          });
        }
        setTotalPage(res.data.totalPage);
      }
    } catch (error) {
      AxiosToastError(error);
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    searchData();
  }, [page,searchTxt]);
console.log("page",page);

  const handleFetchMore = () =>{
    if(totalPage>page){
      setPage(prev=>prev+1)
    }
  }

  return (
    <section className="bg-white">
      <div className="container p-4 mx-auto">
        <p className="font-semibold">Search Result:{data?.length}</p>
        <InfiniteScroll dataLength={data.length} hasMore={true} next={handleFetchMore}>
        <div className="grid w-full grid-cols-1 gap-4 py-4 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {
            data.map((data,index)=>{
              return(
                <CardWithDetails data={data} key = {"kfsdgvoi"+index}/>
              )
            })
          }
          {loading &&
            loadingArrayCard.map((_, index) => {
              return <Loadingcard key={"loadingCard" + index} />;
            })}
        </div>
        </InfiniteScroll>
{
  !data[0] && !loading && (
    <div>
      <p>Not found</p>
    </div>
  )
}
      </div>
    </section>
  );
};

export default SearchPage;
