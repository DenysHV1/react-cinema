import { configureStore } from "@reduxjs/toolkit";
import { filmsReducer } from "./reducer";
import { filmDetailsReducer } from "./filmDetails/filmDetailsReducers";

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    filmDetails: filmDetailsReducer,
  },
});
