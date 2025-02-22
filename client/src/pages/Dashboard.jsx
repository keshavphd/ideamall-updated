import React, { useEffect } from "react";
import UserMenu from "./UserMenu";
import { Link, Outlet } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import AxiosToastError from "../utils/AxiosToastError";
import { getCategoryDetails } from "../utils/axios";

const Dashboard = () => {

  return (
    <div className="lg:grid z-0 rounded lg:m-1 lg:grid-cols-[250px,1fr]">
      <div className="hidden lg:sticky lg:top-20 mr-1 max-h-[calc(100vh-145px)] lg:block rounded bg-white">
        <div className="px-6 py-8 font-sans rounded ">
          <UserMenu />
        </div>
      </div>

      <div className=" w-full font-sans bg-white rounded lg:px-0 lg:pb-1.5 min-h-[76vh]">
        <div className="sticky top-20 pl-0.5 lg:hidden shadow-md py-2">
          <button>
            <Link to="/mobile-user-menu">
              <BiArrowBack size={26} />
            </Link>
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
