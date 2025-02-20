import React, { useEffect, useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import SummaryAPI, { Axios, getUserDetails } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../app/userSlice";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const user = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInput = (e) => {
    const { value, name } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  useEffect(() => {    
    if (!(user.name)) {
      navigate("/login");
    }else{
      navigate("/")
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryAPI.login,
        data: data,
      });
      if (response.data.success) {
        toast.success(response?.data?.msg);
        localStorage.setItem(
          "accessToken",
          response.data.userToken.accessToken
        );
        // console.log("retgr",response.data.userToken.accessToken);
        localStorage.setItem("mytime", Date.now()); 
        const d = localStorage.getItem("mytime"); 
        localStorage.setItem(
          "refreshToken",
          response.data.userToken.refreshToken
        );

        const data = await getUserDetails();
        // console.log(data.data.data);

        dispatch(setUserDetails(data.data.data));

        setData([]);
        navigate("/");
      }
      if (response.data.error) {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  const validateAllValue = Object.values(data).every((value) => value);
  const [showPassword, setShowPassword] = useState(false);

  const handleButton = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <section className="m-1.5 mt-8">
      <div className="max-w-lg px-4 py-10 mx-auto bg-white">
        <h1 className="mb-8 text-4xl font-semibold">Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="container flex flex-col justify-center gap-1 align-middle">
            <label htmlFor="email" className="text-2xl ">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInput}
              className="p-1.5 bg-gray-200 border rounded outline-none focus-within:border-yellow-400"
              placeholder="Enter your email"
            />
            <label htmlFor="password" className="text-2xl ">
              Password:
            </label>
            <div className="flex flex-row items-center justify-between w-full pr-2.5 bg-gray-200 border rounded focus-within:border-yellow-500">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleInput}
                className="border p-1.5  bg-gray-200 w-full rounded outline-none"
                placeholder="Enter your password"
              />
              <div onClick={handleButton}>
                {showPassword ? <IoEye size={26} /> : <GoEyeClosed size={24} />}
              </div>
            </div>
            <Link
              to="/forgot-password"
              className="ml-auto cursor-pointer hover:underline hover:text-orange-400"
            >
              Forgot Password?
            </Link>
            <button
              type="submit"
              disabled={!validateAllValue}
              className={`${
                validateAllValue
                  ? "bg-orange-600 cursor-pointer"
                  : "bg-slate-400"
              } p-2 mt-3 text-lg text-white rounded`}
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-1 font-serif">
          Don't have an account ?{" "}
          <Link to="/register" className="text-blue-700 hover:underline">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
