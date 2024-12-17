import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { filmsReducer } from "./filmsPage/reducers";
import { filmDetailsReducer } from "./filmDetails/filmDetailsReducers";
import { reviewsReducer } from "./reviewsPage/reducers";
import { searchReducer } from "./searchPage/reducer";

const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["films", "filmDetails", "reviews", "search"], // Какие редьюсеры сохранять
};

const rootReducer = combineReducers({
  films: filmsReducer,
  filmDetails: filmDetailsReducer,
  reviews: reviewsReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);


