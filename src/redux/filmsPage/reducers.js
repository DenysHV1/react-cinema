import { createSlice } from "@reduxjs/toolkit";
import {
  searchPopular,
  searchPopularByPage,
  searchPremiersFilms,
  searchPremiersFilmsByPage,
  searchTopRated,
  searchTopRatedByPage,
  searchUpcoming,
  searchUpcomingByPage,
} from "./thunkFilteredTopFilms";

const initialState = {
  films: [],
  page: 1,
  total_pages: 0,
  isLoading: false,
  isError: false,
  isOpen: false,
  filterVariant: "PREMIERS",
};

const progressIsPending = (state) => {
  state.isLoading = true;
  state.isError = false;
};

const resultIsRejected = (state) => {
  state.isLoading = false;
  state.isError = true;
};

const resultFulfilled = (state, { payload }) => {
  state.films = payload.results;
  state.total_pages = payload.total_pages;
  state.isLoading = false;
  state.isError = false;
};

const resultFulfilledByPage = (state, { payload }) => {
  state.films = [
    ...state.films,
    ...payload.results.filter(
      (newFilm) => !state.films.some((existingFilm) => existingFilm.id === newFilm.id)
    ),
  ];
  state.page = payload.page;
  state.isLoading = false;
  state.isError = false;
};

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    toggleMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeMenu: (state) => {
      state.isOpen = false;
    },
    setVariant: (state, { payload }) => {
      state.filterVariant = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // PREMIERS FILMS
      .addCase(searchPremiersFilms.pending, progressIsPending)
      .addCase(searchPremiersFilms.fulfilled, resultFulfilled)
      .addCase(searchPremiersFilms.rejected, resultIsRejected)
      .addCase(searchPremiersFilmsByPage.pending, progressIsPending)
      .addCase(searchPremiersFilmsByPage.fulfilled, resultFulfilledByPage)
      .addCase(searchPremiersFilmsByPage.rejected, resultIsRejected)
      // POPULAR FILMS
      .addCase(searchPopular.pending, progressIsPending)
      .addCase(searchPopular.fulfilled, resultFulfilled)
      .addCase(searchPopular.rejected, resultIsRejected)
      .addCase(searchPopularByPage.pending, progressIsPending)
      .addCase(searchPopularByPage.fulfilled, resultFulfilledByPage)
      .addCase(searchPopularByPage.rejected, resultIsRejected)
      // TOP RATED FILMS
      .addCase(searchTopRated.pending, progressIsPending)
      .addCase(searchTopRated.fulfilled, resultFulfilled)
      .addCase(searchTopRated.rejected, resultIsRejected)
      .addCase(searchTopRatedByPage.pending, progressIsPending)
      .addCase(searchTopRatedByPage.fulfilled, resultFulfilledByPage)
      .addCase(searchTopRatedByPage.rejected, resultIsRejected)
      // UPCOMING FILMS
      .addCase(searchUpcoming.pending, progressIsPending)
      .addCase(searchUpcoming.fulfilled, (state, { payload }) => {
        state.films = payload.results;
        state.total_pages = Math.min(payload.total_pages, 100);
        state.upcoming = [...state.upcoming, ...payload.results]; // Пагинация
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(searchUpcoming.rejected, resultIsRejected)
      .addCase(searchUpcomingByPage.pending, progressIsPending)
      .addCase(searchUpcomingByPage.fulfilled, resultFulfilledByPage)
      .addCase(searchUpcomingByPage.rejected, resultIsRejected);
  },
});

export const { toggleMenu, closeMenu, setVariant } = filmsSlice.actions;
export const filmsReducer = filmsSlice.reducer;
