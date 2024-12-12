import { createSlice } from "@reduxjs/toolkit";
import { searchPremiersFilms } from "./thunkFetchFilms";

const initialState = {
  films: [],
  filmsDate: {
	year: "2024",
	month: "JANUARY",
  },
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
  reducers: {
    changeFilmsDate: (state, { payload }) => {
      state.filmsDate = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPremiersFilms.fulfilled, (state, { payload }) => {
        state.films = payload.items;
        state.isLoading = false;
        state.isError = false;
      })
	  .addCase(searchPremiersFilms.pending, progressIsPending)
      .addCase(searchPremiersFilms.rejected, resultIsRejected);
  },
});

export const {changeFilmsDate} = filmsSlice.actions
export const filmsReducer = filmsSlice.reducer;
