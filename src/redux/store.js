import { configureStore } from "@reduxjs/toolkit";
import { pagesLogicReducer } from "./pagesLogic/pagesLogicReducer";
import { filmsReducer } from "./films/filmsReducer";

export const store = configureStore({
	reducer: {
		base: pagesLogicReducer,
		films: filmsReducer,
	}
})