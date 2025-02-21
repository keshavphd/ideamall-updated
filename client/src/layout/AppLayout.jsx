import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SummaryAPI, {
  Axios,
  getCategoryDetails,
  getSubCategoryDetails,
  getUserDetails,
} from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../app/userSlice";
import AxiosToastError from "../utils/AxiosToastError";
import { handleAddCart } from "./../app/cartSlice";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "../app/productSlice";
import GlobalProvider, { useGlobalContext } from "../provider/GlobalProvider";
import { FaShoppingCart } from "react-icons/fa";
import DisplayPriceinRuppee from "../pages/DisplayPriceinRuppee";
import DisplayMobileCart from "../pages/displayMobileCart";

const AppLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();


  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const categoryData = await getCategoryDetails();
      // console.log("Category", categoryData.data.data);
      dispatch(setAllCategory(categoryData.data.data));
    } catch (error) {
      dispatch(setLoadingCategory(false));
    }
  };

  const getSubCategories = async () => {
    try {
      const res = await getSubCategoryDetails();
      dispatch(setAllSubCategory(res.data.data));
      // console.log("Sub", res.data.data);
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const fetchUser = async () => {
    const userData = await getUserDetails();
    // console.log("user", userData.data.data);
    dispatch(setUserDetails(userData.data.data));
  };
  useEffect(() => {
    fetchUser();
    fetchCategory();
    getSubCategories();
  }, []);

  return (
    <GlobalProvider>
      <div className="w-full">
        <Header className="w-full" />
        <main className="min-h-[78vh]">
          <Outlet />
        </main>
        <Footer className="w-full" />
        <Toaster />
      </div>
      {location.pathname !== "/checkout" && <DisplayMobileCart />}
    </GlobalProvider>
  );
};

export default AppLayout;
