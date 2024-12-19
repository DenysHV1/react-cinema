import { createSlice } from "@reduxjs/toolkit";
import {
  alternativeTitlesThunk,
  filmVideosThunk,
  getCastThunk,
  getChangesThunk,
  getKeywordsThunk,
  getRecommendationsThunk,
  getSimilarThunk,
  reviewsThunk,
  searchDetailsAboutFilmByID,
} from "./filmDetailsThunks";

const initialState = {
  filmDetails: {},
  alternative_titles: [],
  showTitles: false,
  filmDetailsError: false,
  isLoading: false,
  filmVideos: [],
  reviews: [],
  test: "",
  keywords: [],
  changes: {},
  cast: [],
  recommendations: [],
  similar: [],
};

const filmDetailsPending = (state) => {
  state.filmDetailsError = false;
  state.isLoading = true;
};

const filmDetailsRejected = (state) => {
  state.filmDetailsError = true;
  state.isLoading = false;
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
        state.isLoading = false;
      })
      .addCase(searchDetailsAboutFilmByID.rejected, filmDetailsRejected)

      .addCase(alternativeTitlesThunk.pending, filmDetailsPending)
      .addCase(alternativeTitlesThunk.fulfilled, (state, { payload }) => {
        state.filmDetailsError = false;
        state.alternative_titles = payload.titles;
        state.isLoading = false;
      })
      .addCase(alternativeTitlesThunk.rejected, filmDetailsRejected)

      .addCase(filmVideosThunk.pending, filmDetailsPending)
      .addCase(filmVideosThunk.fulfilled, (state, { payload }) => {
        state.filmDetailsError = false;
        state.filmVideos = payload.results;
        state.isLoading = false;
      })
      .addCase(filmVideosThunk.rejected, filmDetailsRejected)

      .addCase(reviewsThunk.pending, filmDetailsPending)
      .addCase(reviewsThunk.fulfilled, (state, { payload }) => {
        state.reviews = payload.results;
        state.filmDetailsError = false;
        state.isLoading = false;
      })
      .addCase(reviewsThunk.rejected, filmDetailsRejected)

      // .addCase(getTestThunk.pending, filmDetailsPending)
      // .addCase(getTestThunk.fulfilled, (state, { payload }) => {
      //   state.filmDetailsError = false;
      //   state.test = payload;
      //   state.isLoading = false;
      // })
      // .addCase(getTestThunk.rejected, filmDetailsRejected)

      .addCase(getKeywordsThunk.pending, filmDetailsPending)
      .addCase(getKeywordsThunk.fulfilled, (state, { payload }) => {
        state.filmDetailsError = false;
        state.keywords = payload.keywords;
        state.isLoading = false;
      })
      .addCase(getKeywordsThunk.rejected, filmDetailsRejected)

      .addCase(getChangesThunk.pending, filmDetailsPending)
      .addCase(getChangesThunk.fulfilled, (state, { payload }) => {
        state.filmDetailsError = false;
        state.changes = payload.changes;
        state.isLoading = false;
      })
      .addCase(getChangesThunk.rejected, filmDetailsRejected)

      .addCase(getCastThunk.pending, filmDetailsPending)
      .addCase(getCastThunk.fulfilled, (state, { payload }) => {
        state.filmDetailsError = false;
        state.cast = payload.cast;
        state.isLoading = false;
      })
      .addCase(getCastThunk.rejected, filmDetailsRejected)

      .addCase(getRecommendationsThunk.pending, filmDetailsPending)
      .addCase(getRecommendationsThunk.fulfilled, (state, { payload }) => {
        state.filmDetailsError = false;
        state.recommendations = payload.results;
        state.isLoading = false;
      })
      .addCase(getRecommendationsThunk.rejected, filmDetailsRejected)

      .addCase(getSimilarThunk.pending, filmDetailsPending)
      .addCase(getSimilarThunk.fulfilled, (state, { payload }) => {
        state.filmDetailsError = false;
        state.similar = payload.results;
        state.isLoading = false;
      })
      .addCase(getSimilarThunk.rejected, filmDetailsRejected);
  },
});

export const filmDetailsReducer = filmDetailsSlice.reducer;
export const { showTitlesReducer } = filmDetailsSlice.actions;
