import { createSlice } from "@reduxjs/toolkit";
import { getChangesThunk } from "./homeThunk";

const initialState = {
  changes1: [],
  changes2: [],
  error: false,
  loading: false,
};

const homePageSlice = createSlice({
  name: "home",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChangesThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getChangesThunk.fulfilled, (state, { payload }) => {
        state.error = false;
        state.loading = false;

        payload.page === 1
          ? (state.changes1 = payload.results)
          : (state.changes2 = payload.results);
      })
      .addCase(getChangesThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const homePageReducer = homePageSlice.reducer;
