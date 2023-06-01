import { createSlice } from "@reduxjs/toolkit";
import { Products } from "@/Data/Products";

const initialState = {
  Products: Products,
  CartItems: [],
  CartTotal: 0,
};

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    SetCartItem: (state, action) => {
      const Item = action.payload.Data;

      const CartItem = state.Products.find((p) => p.id === Item.id);

      state.CartItems.push(CartItem);

      state.CartTotal = state.CartTotal += CartItem.price;
    },
    DeleteCartItem: (state, action) => {
      const CartItem = action.payload.Data;

      state.CartItems = state.CartItems.filter((p) => p.id !== CartItem.id);

      state.CartTotal = state.CartTotal -= CartItem.price;

    },
  },
});
