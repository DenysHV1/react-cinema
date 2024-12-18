import { createSlice } from "@reduxjs/toolkit";
import { companyPageThunk } from "./thunk";

const initialState = {
  company: [],
  error: false,
};

const companySlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(companyPageThunk.pending, (state) => {
        state.error = false;
      })
      .addCase(companyPageThunk.rejected, (state) => {
        state.error = true;
      })
      .addCase(companyPageThunk.fulfilled, (state, { payload }) => {
        state.company = payload;
        console.log(payload);
        
        state.error = false;
      });
  },
});

export const companyReducer = companySlice.reducer;
