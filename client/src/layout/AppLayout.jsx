import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  getCategoryDetails,
  getSubCategoryDetails,
  getUserDetails,
} from "../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../app/userSlice";
import {
  setAllCategory,
  setAllSubCategory,
  setLoadingCategory,
} from "../app/productSlice";
import GlobalProvider from "../provider/GlobalProvider";
import DisplayMobileCart from "../pages/DisplayMobileCart";

const AppLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const categoryData = await getCategoryDetails();
      dispatch(setAllCategory(categoryData.data.data));
    } catch (error) {
      dispatch(setLoadingCategory(false));
    }
  };
  const value = (localStorage.getItem("accessToken") != null);
  const loggedIn = value;

  const getSubCategories = async () => {
    try {
      dispatch(setLoadingCategory(true));
      const res = await getSubCategoryDetails();
      dispatch(setAllSubCategory(res.data.data));
    } catch (error) {
      dispatch(setLoadingCategory(false));
    }
  };
  const fetchUser = async () => {
    const userData = await getUserDetails();
    dispatch(setUserDetails(userData.data.data));
  };
  // console.log("isLoog",loggedIn);
  
  useEffect(() => {
    if(loggedIn){
      fetchUser();
    }
    fetchCategory();
    getSubCategories();
  }, [value]);

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
