import { configureStore } from "@reduxjs/toolkit";
import { MenuSlice } from "./MenuSlice";
import { ProductSlice } from "./ProductSlice";
import { UserSlice } from "./UserSlice";

export const Store = configureStore({
  reducer: {
    MenuSlice: MenuSlice.reducer,
    ProductSlice: ProductSlice.reducer,
    UserSlice: UserSlice.reducer,
  },
});
