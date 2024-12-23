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
import { companyReducer } from "./companyPage/reducers";
import { homePageReducer } from "./homePage/homeReducer";
import { authReducer } from "./auth/authReducers";
import { userReducer } from "./User/userReducer";


const rootPersistConfig = {
  key: "root",
  storage,
  whitelist: ["films", "filmDetails", "reviews", "search", "user", "auth"],
};

const rootReducer = combineReducers({
  films: filmsReducer,
  filmDetails: filmDetailsReducer,
  reviews: reviewsReducer,
  search: searchReducer,
  company: companyReducer,
  home: homePageReducer,
  auth: authReducer,
  user: userReducer,
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


