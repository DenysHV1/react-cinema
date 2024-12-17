import { configureStore } from "@reduxjs/toolkit";
import { filmsReducer } from "./filmsPage/reducer";
import { filmDetailsReducer } from "./filmDetails/filmDetailsReducers";
import { reviewsReducer } from "./reviewsPage/reducers";
import { searchReducer } from "./searchPage/reducer";

export const store = configureStore({
  reducer: {
    films: filmsReducer,
    filmDetails: filmDetailsReducer,
    reviews: reviewsReducer,
    search: searchReducer,
  },
});
