import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryAPI, { Axios } from "../utils/axios";
import toast from "react-hot-toast";

const EnterOtp = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);

  const navigate = useNavigate()
  const location = useLocation();
  console.log(location);
  
  useEffect(()=>{
    if(!(location?.state?.email)){
      navigate("/login")
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryAPI.verifyOtp,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });
      if(response?.data?.success){
        toast.success(response?.data?.msg)
        navigate("/update-password",{state:{email:location?.state?.email}})
        setData([])
      }
      if(response?.data?.error){
        toast.error(response?.data?.msg)
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const inputRefs = useRef([]);
  const validateAllValue = Object.values(data).every((value) => value);
  return (
    <section className="m-1.5 mt-8">
      <div className="max-w-lg px-4 py-10 mx-auto bg-white">
        <h1 className="mb-8 text-4xl font-semibold">Enter OTP</h1>

        <form onSubmit={handleSubmit} className="w-full">
          <p className="mb-4 text-2xl text-center">OTP:</p>
          <div className="grid justify-center w-4/5 grid-cols-6 gap-3 mx-auto align-middle">
            {data.map((_, index) => {
              return (
                <input
                  type="text"
                  key={index}
                  className="p-1.5 bg-gray-200 border rounded outline-none focus-within:border-yellow-400 text-center"
                  ref={(element) => {
                    inputRefs.current[index] = element;
                    return element;
                  }}
                  value={data[index]}
                  maxLength={1}
                  onChange={(e) => {
                    const value = e.target.value;
                    const newData = [...data];
                    newData[index] = value;
                    setData(newData);
                    if (value && index < 5) {
                      inputRefs.current[index + 1].focus();
                    }
                  }}
                />
              );
            })}
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
          <Link to="/update-password" className="text-blue-700 hover:underline">
            Update Password
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EnterOtp;
