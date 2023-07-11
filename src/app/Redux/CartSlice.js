import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CartItems: [],
  CartTotal: 0,
  CartModal: false,
};

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    SetCartItem: (state, action) => {
      const Item = action.payload.Data; //Data form Details
      const Items = state.CartItems.find((p) => p.id === Item.id); //Filter the item from the cart

      if (Items) {
        Items.quantity += 1;
      } else {
        state.CartItems.push({ ...Item, quantity: 1 });
      }
      state.CartTotal = state.CartTotal += Item.price;
    },
    DeleteCartItem: (state, action) => {
      const CartItem = action.payload.Data;

      state.CartItems = state.CartItems.filter((p) => p.id !== CartItem.id);

      if (CartItem.quantity > 1) {
        state.CartTotal = state.CartTotal -= CartItem.price * CartItem.quantity;
      } else {
        state.CartTotal = state.CartTotal -= CartItem.price;
      }
    },
    SetCartModal: (state) => {
      if (!state.CartModal) {
        state.CartModal = true;
      } else {
        state.CartModal = false;
      }
    },
    ClearCart: (state) => {
      state.CartItems = [];
      state.CartTotal = 0;
    },
    IncreaseQuantity: (state, action) => {
      const ItemId = action.payload;

      const Item = state.CartItems.find((p) => p.id === ItemId);

      if (Item.quantity < Item.stock) {
        Item.quantity += 1;
        state.CartTotal = state.CartTotal += Item.price;
      }
    },
    DecreaseQuantity: (state, action) => {
      const ItemId = action.payload;

      const Item = state.CartItems.find((p) => p.id === ItemId);

      if (Item.quantity === 1) {
        state.CartItems = state.CartItems.filter((p) => p.id !== ItemId);
        state.CartTotal = state.CartTotal -= Item.price * Item.quantity;
      } else {
        state.CartTotal = state.CartTotal -= Item.price;
        Item.quantity -= 1;
      }
    },
  },
});

export const CartItemsCount = (state) => state.CartSlice.CartItems.length; // This is a selector function that will be used in the CartModal component to display the number of items in the cart.
