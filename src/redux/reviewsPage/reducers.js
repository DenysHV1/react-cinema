import { createSlice } from "@reduxjs/toolkit";
import { reviewsPageThunk } from "./thunk";

const initialState = {
  reviews: [],
  error: false,
  loading: false,
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(reviewsPageThunk.pending, (state) => {
        state.error = false;
        state.loading = true;
      })
      .addCase(reviewsPageThunk.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(reviewsPageThunk.fulfilled, (state, { payload }) => {
        state.reviews = payload;
        state.error = false;
        state.loading = false;
      });
  },
});

export const reviewsReducer = reviewsSlice.reducer;
