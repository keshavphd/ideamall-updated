import React, { useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SummaryAPI, { Axios } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleButton1 = () => {
    setShowPassword((prev) => !prev);
  };

  const handleButton2 = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      toast.error("password and confirm password must be same");
      return;
    }
    try {
      const response = await Axios({
        ...SummaryAPI.register,
        data: data,
      });
      if (response.data.error) {
        toast.error(response?.data?.msg);
      }
      if (response.data.success) {
        toast.success(response?.data?.msg);
        setData([]);
        navigate("/check-your-email")
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const validateAllValue = Object.values(data).every((value) => value);
  return (
    <section className="m-1.5 mt-8">
      <div className="max-w-lg px-4 py-10 mx-auto bg-white">
        <h1 className="mb-8 text-4xl font-semibold">Register</h1>

        <form onSubmit={handleSubmit}>
          <div className="container flex flex-col justify-center gap-1 align-middle">
            <label htmlFor="name" className="text-2xl ">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInput}
              className="p-1.5 bg-gray-200 border rounded outline-none focus-within:border-yellow-400"
              placeholder="Enter your name"
            />
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
            <label htmlFor="phone" className="text-2xl ">
              Mobile Number:
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              onChange={handleInput}
              className="p-1.5 bg-gray-200 border rounded outline-none focus-within:border-yellow-400 appearance-auto"
              placeholder="Enter your phone number"
            />
            <label htmlFor="password" className="text-2xl ">
              Password:
            </label>
            <div className="flex flex-row items-center justify-between w-full pr-2.5 bg-gray-200 border rounded focus-within:border-yellow-500">
              <input
                type={showPassword ? "text" : "password"}
                className="border p-1.5  bg-gray-200 w-full rounded outline-none"
                id="password"
                name="password"
                onChange={handleInput}
                placeholder="Enter your password"
              />
              <div onClick={handleButton1}>
                {showPassword ? <IoEye size={26} /> : <GoEyeClosed size={24} />}
              </div>
            </div>
            <label htmlFor="confirmPassword" className="text-2xl ">
              Confirm Password:
            </label>
            <div className="flex flex-row items-center justify-between w-full pr-2.5 bg-gray-200 border rounded focus-within:border-yellow-500">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="border p-1.5  bg-gray-200 w-full rounded outline-none"
                id="confirmPassword"
                name="confirmPassword"
                onChange={handleInput}
                placeholder="Enter password again"
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
          Already have an account ?{" "}
          <Link to="/login" className="text-blue-700 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
