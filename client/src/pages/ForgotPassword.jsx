import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryAPI, { Axios } from "../utils/axios";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
const navigate = useNavigate()
  const handleInput = (e) => {
    const { value, name } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryAPI.forgotPassword,
        data: data,
      });
      if (response.data.success) {
        toast.success(response.data.msg);
        navigate("/enter-otp",{state:data})
      }
      if (response.data.error) {
        toast.error(response.data.msg);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const validateAllValue = Object.values(data).every((value) => value);

  return (
    <section className="m-1.5 mt-8">
      <div className="max-w-lg px-4 py-10 mx-auto bg-white">
        <h1 className="mb-8 text-4xl font-semibold">Enter your email</h1>

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
          </div>
          <button
            type="submit"
            disabled={!validateAllValue}
            className={`${
              validateAllValue ? "bg-orange-600 cursor-pointer" : "bg-slate-400"
            } p-2 mt-3 text-lg text-white w-full rounded`}
          >
            Submit
          </button>
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

export default ForgotPassword;
