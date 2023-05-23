import { createSlice } from "@reduxjs/toolkit";
import { Products } from "@/Data/Products";

const initialState = {
  Products: Products,
  Details: null,
};

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    SetDetails: (state, action) => {
      const Id = action.payload;

      const Product = state.Products.find((p) => p.id === Id);

      state.Details = Product;
    },
  },
});
