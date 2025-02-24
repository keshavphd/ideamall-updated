import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserProfilePhotoEdit from "./UserProfilePhotoEdit";
import { PiUserLight } from "react-icons/pi";
import { GoEyeClosed } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import SummaryAPI, { Axios } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../app/userSlice";

const UserProfile = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: "",
  });

  const handleInput = (e) => {
    const { value, name } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };
  const [profilePhoto, setProfilePhoto] = useState(false);
  const uploadImage = () => {
    setProfilePhoto((prev) => !prev);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleButton1 = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryAPI.updateProfile,
        data: data,
      });
      if (!data.password) {
        toast.error("Enter password");
        return;
      }
      if (response.data.success) {
        toast.success(response.data.msg);
        dispatch(setUserDetails(response.data.updatedValue));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <>
      <div className="px-3 py-2 mb-1 font-mono text-2xl bg-white lg:shadow-md">
        Update your profile
      </div>
      <div className="p-5">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt="Image"
            sizes="cover"
            width="100px"
            height="100px"
            className="rounded-full"
          />
        ) : (
          <PiUserLight />
        )}
        <button className="p-2 bg-orange-400 rounded" onClick={uploadImage}>
          Upload Image
        </button>
        {profilePhoto && (
          <UserProfilePhotoEdit close={() => setProfilePhoto(false)} />
        )}

        <form onSubmit={handleForm}>
          <div className="container flex flex-col justify-center gap-1 align-middle">
            <label htmlFor="name" className="text-2xl ">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
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
              value={data.email}
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
              value={data.phone}
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
                value={data.password}
                onChange={handleInput}
                placeholder="Enter your password"
              />
              <div onClick={handleButton1}>
                {showPassword ? <IoEye size={26} /> : <GoEyeClosed size={24} />}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-2 bg-orange-500 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default UserProfile;
