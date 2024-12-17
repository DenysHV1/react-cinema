import { createSlice } from "@reduxjs/toolkit";
import {
  alternativeTitlesThunk,
  filmVideosThunk,
  reviewsThunk,
  searchDetailsAboutFilmByID,
} from "./filmDetailsThunks";

const initialState = {
  filmDetails: {},
  alternative_titles: [],
  showTitles: false,
  filmDetailsError: false,
  filmVideos: [],
  reviews: [],
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
      .addCase(searchDetailsAboutFilmByID.pending, filmDetailsPending)
      .addCase(searchDetailsAboutFilmByID.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isError = false;
        state.filmDetails = payload;
      })
      .addCase(searchDetailsAboutFilmByID.rejected, filmDetailsRejected)
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
      .addCase(filmVideosThunk.rejected, filmDetailsRejected)
      .addCase(reviewsThunk.pending, filmDetailsPending)
      .addCase(reviewsThunk.fulfilled, (state, {payload}) => {
        state.reviews = payload.results;
        state.filmDetailsError = false;
      })
      .addCase(reviewsThunk.rejected, filmDetailsRejected)
  },
});

export const filmDetailsReducer = filmDetailsSlice.reducer;
export const { showTitlesReducer } = filmDetailsSlice.actions;
