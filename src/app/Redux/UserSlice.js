import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  User: null,
  UserImage: [],
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      const { userId, userEmail, admin } = action.payload;

      state.User = { userId, userEmail, admin };
    },
    LogOutUser: (state) => {
      state.User = null;
    },
    SetUserImage: (state, action) => {
      const Image = action.payload;

      state.UserImage.push(Image);
    },
    ClearUserImage: (state) => {
      state.UserImage = [];
    },
  },
});
