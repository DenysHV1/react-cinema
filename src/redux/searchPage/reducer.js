import { createSlice } from "@reduxjs/toolkit";
import { searchThunk } from "./thunk";

const initialState = {
  searched: [],
  error: false,
  name: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addName: (state, { payload }) => {
      state.name = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchThunk.pending, (state) => {
        state.error = false;
      })
      .addCase(searchThunk.fulfilled, (state, { payload }) => {
        state.error = false;
        state.searched = payload.results;
      })
      .addCase(searchThunk.rejected, (state) => {
        state.error = true;
        state.name = ''
      });
  },
});

export const searchReducer = searchSlice.reducer;
export const { addName } = searchSlice.actions;
