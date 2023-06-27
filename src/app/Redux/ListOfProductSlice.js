import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OpenModal: false,
  ModalData: [],
};

export const ListOfProductSlice = createSlice({
  name: "ListOfProduct",
  initialState,
  reducers: {
    OpenModal: (state) => {
      if (!state.OpenModal) {
        state.OpenModal = true;
      } else {
        state.OpenModal = false;
      }
    },
    SetModalData: (state, action) => {
      state.ModalData = action.payload;
    },
    ClearModalData: (state) => {
      state.ModalData = [];
    },
  },
});
