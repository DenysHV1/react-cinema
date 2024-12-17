import { createSlice } from "@reduxjs/toolkit";
import { reviewsPageThunk } from "./thunk";

const initialState = {
  reviews: [],
  error: false,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(reviewsPageThunk.pending, (state) => {
        state.error = false;
      })
      .addCase(reviewsPageThunk.rejected, (state) => {
        state.error = true;
      })
      .addCase(reviewsPageThunk.fulfilled, (state, { payload }) => {
        state.reviews = payload;
        state.error = false;
      });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
