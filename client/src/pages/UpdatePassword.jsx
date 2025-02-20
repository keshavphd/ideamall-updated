import React, { useEffect, useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryAPI, { Axios } from "../utils/axios";
import toast from "react-hot-toast";

const UpdatePassword = () => {
  const location = useLocation();

  const [data, setData] = useState({
    newPassword: "",
    confirmPassword: "",
    email: location?.state?.email,
  });
  const navigate = useNavigate();
  console.log(location);

  const handleInput = (e) => {
    const { value, name } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  useEffect(()=>{
    if(!(location?.state?.email)){
      navigate("/login")
    }
  },[])

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleButton1 = () => {
    setShowPassword((prev) => !prev);
  };
  const handleButton2 = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryAPI.updatePassword,
        data: data,
      });
      if (response?.data?.success) {
        toast.success(response?.data?.msg);
        setData([]);
        navigate("/login")
      }
      if (response?.data?.error) {
        toast.error(response?.data?.msg);
      }
      // console.log(location?.state?.email);

      // console.log(response);
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const validateAllValue = Object.values(data).every((value) => value);
  return (
    <section className="m-1.5 mt-8">
      <div className="max-w-lg px-4 py-10 mx-auto bg-white">
        <h1 className="mb-8 text-4xl font-semibold">Update Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="container flex flex-col justify-center gap-1 align-middle">
            <label htmlFor="newPassword" className="text-2xl ">
              Password:
            </label>
            <div className="flex flex-row items-center justify-between w-full pr-2.5 bg-gray-200 border rounded focus-within:border-yellow-500">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={data.newPassword}
                name="newPassword"
                onChange={handleInput}
                className="border p-1.5  bg-gray-200 w-full rounded outline-none"
                placeholder="Enter your password"
              />
              <div onClick={handleButton1}>
                {showPassword ? <IoEye size={26} /> : <GoEyeClosed size={24} />}
              </div>
            </div>
          </div>
          <div className="container flex flex-col justify-center gap-1 align-middle">
            <label htmlFor="confirmPassword" className="text-2xl ">
              Confirm Password:
            </label>
            <div className="flex flex-row items-center justify-between w-full pr-2.5 bg-gray-200 border rounded focus-within:border-yellow-500">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleInput}
                className="border p-1.5  bg-gray-200 w-full rounded outline-none"
                placeholder="Enter your password"
              />
              <div onClick={handleButton2}>
                {showConfirmPassword ? (
                  <IoEye size={26} />
                ) : (
                  <GoEyeClosed size={24} />
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-2 mt-3 text-lg text-white bg-orange-600 rounded cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-1 font-serif">
          Already have an account ?{" "}
          <Link
            to="/update-user-detail"
            className="text-blue-700 hover:underline"
          >
            Update User Details
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
