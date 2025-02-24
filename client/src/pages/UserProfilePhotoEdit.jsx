import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgClose } from "react-icons/cg";
import SummaryAPI, { Axios } from "../utils/axios";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../app/userSlice";
import { PiUserLight } from "react-icons/pi";

const UserProfilePhotoEdit = ({ close }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const handleSubmitForm = (e) => {
    e.preventDefault();
  };
  const changeUploadedImage = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryAPI.uploadImage,
        data: formData,
      });

      // console.log(response.data.data.avatar);

      dispatch(updateAvatar(response.data.data.avatar));
      close();
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center gap-1 bg-slate-950 bg-opacity-30 position">
      <div className="flex flex-col items-center justify-center gap-5 p-5 bg-white w-29 h-29">
        <div className="ml-auto w-29">
          <button onClick={close}>
            <CgClose size={23} />
          </button>
        </div>
        <div className="font-mono text-2xl">Change Profile Image</div>
        {user.avatar ? (
          <img src={user.avatar} alt="Image" width={150} height={150} />
        ) : (
          <PiUserLight />
        )}
        <form onSubmit={handleSubmitForm}>
          <label htmlFor="picture">
            <div className="p-2 bg-orange-400 rounded">
              {loading ? "loading..." : "Upload Picture"}
            </div>
            <input
              type="file"
              id="picture"
              onChange={changeUploadedImage}
              name="picture"
              className="hidden"
            />
          </label>
        </form>
        {/* <form onSubmit={handleSubmitForm}></form> */}
      </div>
    </div>
  );
};

export default UserProfilePhotoEdit;
