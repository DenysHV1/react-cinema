import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const pagesLogicSlice = createSlice({
  name: "pageLogic",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
  },
});

export const pagesLogicReducer = pagesLogicSlice.reducer;
export const { toggleMenu, closeMenu } = pagesLogicSlice.actions;
