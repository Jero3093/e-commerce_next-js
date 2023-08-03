import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Details: null,
  DBProducts: [],
};

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    SetDetails: (state, action) => {
      state.Details = action.payload;
    },
    SetDBProducts: (state, action) => {
      const Data = action.payload;

      state.DBProducts.push(Data);
    },
    SetCleaerDBProducts: (state) => {
      state.DBProducts = [];
    },
  },
});
