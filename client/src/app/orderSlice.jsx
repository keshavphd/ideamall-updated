import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: []
};

const orderSlice = createSlice({
    name:"allOrders",
    initialState:initialState,
    reducers:{
        setOredrs:(state,action)=>{
            state.order = [...action.payload]
        }
    }
})
export const { setOredrs } = orderSlice.actions;

export default orderSlice.reducer;