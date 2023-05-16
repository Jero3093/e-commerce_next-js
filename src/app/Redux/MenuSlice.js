"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Open: false,
};

export const MenuSlice = createSlice({
  name: "MenuSlice",
  initialState,
  reducers: {
    SetMenu: (state, action) => {
      const Value = action.payload;

      state.Open = Value;
    },
  },
});
