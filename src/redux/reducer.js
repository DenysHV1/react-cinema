import { createSlice } from "@reduxjs/toolkit";
import initialState from "./initialState";
import {
  searchPremiersFilms,
  searchPremiersFilmsByPage,
} from "./thunks/thunkTrending";
import { searchDetailsAboutFilmByID } from "./thunks/thinkFilmDetails";
import {
  searchNuwPlaying,
  searchNuwPlayingByPage,
  searchPopular,
  searchPopularByPage,
  searchTopRated,
  searchTopRatedByPage,
  searchUpcoming,
  searchUpcomingByPage,
} from "./thunks/thunkFilteredTopFilms";

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
  if (payload.total_pages > 100) {
    state.total_pages = 100;
  } else {
    state.total_pages = payload.total_pages;
  }
  state.isLoading = false;
  state.isError = false;
};

const resultFulfilledByPage = (state, { payload }) => {
  state.films = payload.results;
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
	setVariant: (state, {payload}) => {
		state.filterVariant = payload
	}
  },
  extraReducers: (builder) => {
    builder

      //todo 2. PREMIERS FILMS/TOP------------------------------
      .addCase(searchPremiersFilms.pending, progressIsPending)
      .addCase(searchPremiersFilms.fulfilled, resultFulfilled)
      .addCase(searchPremiersFilms.rejected, resultIsRejected)
      //*2. PREMIERS FILMS BY PAGE/TOP
      .addCase(searchPremiersFilmsByPage.pending, progressIsPending)
      .addCase(searchPremiersFilmsByPage.fulfilled, resultFulfilledByPage)
      .addCase(searchPremiersFilmsByPage.rejected, resultIsRejected)

      //todo 3. NUW PLAYING/TOP---------------------------------
      .addCase(searchNuwPlaying.pending, progressIsPending)
      .addCase(searchNuwPlaying.fulfilled, resultFulfilled)
      .addCase(searchNuwPlaying.rejected, resultIsRejected)
      //*3. NUW PLAYING BY PAGE/TOP
      .addCase(searchNuwPlayingByPage.pending, progressIsPending)
      .addCase(searchNuwPlayingByPage.fulfilled, resultFulfilledByPage)
      .addCase(searchNuwPlayingByPage.rejected, resultIsRejected)

      //todo 4. POPULAR/TOP---------------------------------
      .addCase(searchPopular.pending, progressIsPending)
      .addCase(searchPopular.fulfilled, resultFulfilled)
      .addCase(searchPopular.rejected, resultIsRejected)
      //* 4. POPULAR BY PAGE/TOP
      .addCase(searchPopularByPage.pending, progressIsPending)
      .addCase(searchPopularByPage.fulfilled, resultFulfilledByPage)
      .addCase(searchPopularByPage.rejected, resultIsRejected)

      //todo 5.TOP RATED/TOP---------------------------------
      .addCase(searchTopRated.pending, progressIsPending)
      .addCase(searchTopRated.fulfilled, resultFulfilled)
      .addCase(searchTopRated.rejected, resultIsRejected)
      //* 5.TOP RATED BY PAGE/TOP
      .addCase(searchTopRatedByPage.pending, progressIsPending)
      .addCase(searchTopRatedByPage.fulfilled, resultFulfilledByPage)
      .addCase(searchTopRatedByPage.rejected, resultIsRejected)

      //todo 6.UPCOMING/TOP---------------------------------
      .addCase(searchUpcoming.pending, progressIsPending)
      .addCase(searchUpcoming.fulfilled, resultFulfilled)
      .addCase(searchUpcoming.rejected, resultIsRejected)
      //* 6.UPCOMING BY PAGE/TOP
      .addCase(searchUpcomingByPage.pending, progressIsPending)
      .addCase(searchUpcomingByPage.fulfilled, resultFulfilledByPage)
      .addCase(searchUpcomingByPage.rejected, resultIsRejected)

      //1.searchDetailsAboutFilmByID
      .addCase(searchDetailsAboutFilmByID.pending, progressIsPending)
      .addCase(searchDetailsAboutFilmByID.fulfilled, (state, {payload}) => {
		state.isLoading = false;
		state.isError = false;
		console.log(payload);
		
		state.filmDetails = payload
	  })
      .addCase(searchDetailsAboutFilmByID.rejected, resultIsRejected);
  },
});

export const { toggleMenu, closeMenu, setVariant } = filmsSlice.actions;
export const filmsReducer = filmsSlice.reducer;
