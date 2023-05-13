import { configureStore } from "@reduxjs/toolkit";
import { MenuSlice } from "./MenuSlice";

export const Store = configureStore({
  reducer: {
    MenuSlice: MenuSlice.actions,
  },
});
