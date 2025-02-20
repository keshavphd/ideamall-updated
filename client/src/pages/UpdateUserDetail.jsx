import React, { useState } from "react";
import { Link } from "react-router-dom";

const UpdateUserDetail = () => {
    const [showPassword, setShowPassword] = useState(false);
    
      const handleButton = () => {
        setShowPassword((prev) => !prev);
      };
  return (
        <section className="m-1.5 mt-8">
          <div className="max-w-lg px-4 py-10 mx-auto bg-white">
            <h1 className="mb-8 text-4xl font-semibold">Update User Details</h1>
    
            <form>
              <div className="container flex flex-col justify-center gap-1 align-middle">
                <label htmlFor="name" className="text-2xl ">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
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
                  className="p-1.5 bg-gray-200 border rounded outline-none focus-within:border-yellow-400 appearance-auto"
                  placeholder="Enter your phone number"
                />
                
                <button
                  type="submit"
                  className="p-2 mt-3 text-lg text-white bg-orange-600 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="mt-1 font-serif">
              Already have an account ?{" "}
              <Link to="/login" className="text-blue-700 hover:underline">
              </Link>
            </div>
          </div>
        </section>

    
  );
};

export default UpdateUserDetail;
