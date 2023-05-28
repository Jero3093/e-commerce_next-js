import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  User: null,
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      const { userId, userEmail } = action.payload;

      state.User = { userId, userEmail };
    },
    LogOutUser: (state) => {
      state.User = null;
    },
  },
});
