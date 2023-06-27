import { configureStore } from "@reduxjs/toolkit";
import { MenuSlice } from "./MenuSlice";
import { ProductSlice } from "./ProductSlice";
import { UserSlice } from "./UserSlice";
import { CartSlice } from "./CartSlice";
import { ListOfProductSlice } from "./ListOfProductSlice";

export const Store = configureStore({
  reducer: {
    MenuSlice: MenuSlice.reducer,
    ProductSlice: ProductSlice.reducer,
    UserSlice: UserSlice.reducer,
    CartSlice: CartSlice.reducer,
    ListOfProductSlice: ListOfProductSlice.reducer,
  },
});
