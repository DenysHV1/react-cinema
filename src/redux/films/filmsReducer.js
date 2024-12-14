import { createSlice } from "@reduxjs/toolkit";
import {
  searchDetailsAboutFilmByID,
  searchPremiersFilms,
  searchPremiersFilmsByPage,
} from "./thunkFetchFilms";

const initialState = {
  films: [],
  page: 1,
  total_pages: 0,
  filmDetails: {},
  isLoading: false,
  isError: false,
};

const progressIsPending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const resultIsRejected = (state) => {
  state.isLoading = false;
  state.isError = true;
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  // reducers: {
  //   changeFilmsPage: (state, { payload }) => {
  //     state.page = payload;
  //     // console.log(state.page);
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(searchPremiersFilms.pending, progressIsPending)
      .addCase(searchPremiersFilms.fulfilled, (state, { payload }) => {
        state.films = payload.results;
        state.total_pages = payload.total_pages;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(searchPremiersFilms.rejected, resultIsRejected)

      .addCase(searchPremiersFilmsByPage.pending, progressIsPending)
      .addCase(searchPremiersFilmsByPage.fulfilled, (state, { payload }) => {
        state.films = payload.results;
        state.total_pages = payload.total_pages;
        state.page = payload.page;
        state.isLoading = false;
        state.isError = false;
      })

      .addCase(searchPremiersFilmsByPage.rejected, resultIsRejected)
      .addCase(searchDetailsAboutFilmByID.pending, progressIsPending)
      .addCase(searchDetailsAboutFilmByID.fulfilled, (state, { payload }) => {
        state.filmDetails = payload;
        state.isLoading = false;
        state.isError = false;
        console.log(payload);
        
      })
      .addCase(searchDetailsAboutFilmByID.rejected, resultIsRejected);
  },
});

// export const { changeFilmsPage } = filmsSlice.actions;
export const filmsReducer = filmsSlice.reducer;
