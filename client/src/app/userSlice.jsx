import { createSlice } from "@reduxjs/toolkit";

const initalValue = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  phone: "",
  verify_email: "",
  last_login_date: "",
  status: "",
  address_details: [],
  shopping_cart: [],
  orderHistory: [],
  role: "",
};
const userSlice = createSlice({
  name: "user",
  initialState: initalValue,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state._id = action.payload?._id;
      state.avatar = action.payload?.avatar;
      state.phone = action.payload?.phone;
      state.verify_email = action.payload?.verify_email;
      state.last_login_date = action.payload?.last_login_date;
      state.status = action.payload?.status;
      state.address_details = action.payload?.address_details;
      state.shopping_cart = action.payload?.shopping_cart;
      state.orderHistory = action.payload?.orderHistory;
      state.role = action.payload?.role;
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    updateProfile: (state, action) => {
      state.name = action.payload?.name;
      state.phone = action.payload?.phone;
      state.email = action.payload?.email;
      state.password = action.payload?.password;
    },
    logout: (state, action) => {
      state.name = "";
      state.email = "";
      state._id = "";
      state.avatar = "";
      state.phone = "";
      state.verify_email = "";
      state.last_login_date = "";
      state.status = "";
      state.address_details = [];
      state.shopping_cart = [];
      state.orderHistory = [];
      state.role = "";
    },
  },
});

export const { setUserDetails, logout, updateAvatar, updateProfile } =
  userSlice.actions;

export default userSlice.reducer;
