import React, { useState } from "react";
import { Link } from "react-router-dom";

const CheckYourEmail = () => {
  return (
    <section className="m-1.5 mt-8">
      <div className="max-w-lg px-4 py-10 mx-auto bg-white max-h-99">
        <h1 className="mb-8 text-4xl font-semibold text-center">
          Verify your Email
        </h1>

        <div className="text-center">
          <span className="p-4">Check Your email</span>
        </div>
        <br />
        <div className="text-center">
          <Link to="/login" className="px-5 py-3 text-white bg-yellow-600 hover:underline">
            Go to Login Page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CheckYourEmail;
