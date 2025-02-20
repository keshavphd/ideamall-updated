import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HorizontalLine from "./HorizontalLine";
import { logoutUser } from "../utils/axios";
import toast from "react-hot-toast";
import { logout } from "../app/userSlice";
import { BsBoxArrowUpRight } from "react-icons/bs";
const UserMenu = ({ close }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const response = await logoutUser();
    console.log(response);
    if (response.data.success) {
      if (close) {
        close();
      }
      dispatch(logout());
      localStorage.clear();
      toast.success(response.data.msg);
      navigate("/");
    }
  };

  const gotoProfile = async () => {
    navigate("/dashboard/profile");
  };

  return (
    <div>
      <div className="font-semibold">My Account </div>
      <div className="flex flex-row items-center content-center gap-2">
        <div className="hidden lg:block">{(user.name).slice(0,12)+"..."}{user.role == "ADMIN" ? (<span className="text-orange-500">(Admin)</span>):(<p></p>)}</div>
        <div className="lg:hidden">{(user.name).slice(0,50)}{user.role == "ADMIN" ? (<span>(Admin)</span>):(<p></p>)}</div>
        <button onClick={gotoProfile} className="font-bold">
          <BsBoxArrowUpRight />
        </button>
      </div>
      <HorizontalLine />
      <div className="flex flex-col py-1 ">
      {user.role == "ADMIN" ? (
        <>
        <Link
        to="/dashboard/product"
        className="py-1 hover:bg-orange-600 hover:text-white "
      >
        Product
      </Link>
      <Link
        to="/dashboard/upload-product"
        className="py-1 hover:bg-orange-600 hover:text-white "
      >
        Upload Product
      </Link>
      <Link
        to="/dashboard/category"
        className="py-1 hover:bg-orange-600 hover:text-white "
      >
        Category
      </Link>
      <Link
        to="/dashboard/sub-category"
        className="py-1 hover:bg-orange-600 hover:text-white "
      >
       Sub-Category
      </Link>
      </>):(<></>)}
      
        <Link
          to="/dashboard/orders"
          className="py-1 hover:bg-orange-600 hover:text-white "
        >
          Orders
        </Link>
        <Link
          to="/dashboard/address"
          className="py-1 hover:bg-orange-600 hover:text-white "
        >
          Address
        </Link>
        <button
          onClick={handleLogout}
          className="flex flex-initial py-1 font-semibold hover:bg-orange-600 hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
