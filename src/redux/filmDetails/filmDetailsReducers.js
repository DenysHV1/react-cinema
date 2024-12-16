import { createSlice } from "@reduxjs/toolkit";
import { alternativeTitlesThunk, filmVideosThunk } from "./filmDetailsThunks";

const initialState = {
  alternative_titles: [],
  showTitles: false,
  filmDetailsError: false,
  filmVideos: [],
};

const filmDetailsPending = (state) => {
  state.filmDetailsError = false;
};

const filmDetailsRejected = (state) => {
  state.filmDetailsError = true;
};

const filmDetailsSlice = createSlice({
  name: "film_details",
  initialState,
  reducers: {
    showTitlesReducer: (state) => {
      state.showTitles = !state.showTitles;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(alternativeTitlesThunk.pending, filmDetailsPending)
      .addCase(alternativeTitlesThunk.fulfilled, (state, { payload }) => {
        state.filmDetailsError = false;
        state.alternative_titles = payload.titles;
      })
      .addCase(alternativeTitlesThunk.rejected, filmDetailsRejected)
      .addCase(filmVideosThunk.pending, filmDetailsPending)
      .addCase(filmVideosThunk.fulfilled, (state, { payload }) => {
        state.filmDetailsError = false;
        state.filmVideos = payload.results;
      })
      .addCase(filmVideosThunk.rejected, filmDetailsRejected);
  },
});

export const filmDetailsReducer = filmDetailsSlice.reducer;
export const { showTitlesReducer } = filmDetailsSlice.actions;
