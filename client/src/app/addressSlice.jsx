import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: [],
};
const addressSlice = createSlice({
  name: "allAddress",
  initialState: initialState,
  reducers: {
    handleAddAddress: (state, action) => {
      state.toalAddress = [...action.payload];
    },
  },
});

export const { handleAddAddress } = addressSlice.actions;

export default addressSlice.reducer;