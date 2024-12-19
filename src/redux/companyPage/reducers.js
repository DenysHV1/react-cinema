import { createSlice } from "@reduxjs/toolkit";
import { companyPageThunk } from "./thunk";

const initialState = {
  company: [],
  error: false,
  loader: false,
};

const companySlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(companyPageThunk.pending, (state) => {
        state.error = false;
        state.loader = true;
      })
      .addCase(companyPageThunk.rejected, (state) => {
        state.error = true;
        state.loader = false;
      })
      .addCase(companyPageThunk.fulfilled, (state, { payload }) => {
        state.company = payload;
        state.loader = false;
        state.error = false;
      });
  },
});

export const companyReducer = companySlice.reducer;
