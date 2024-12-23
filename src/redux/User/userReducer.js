import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  films: [],
};

const userSlice = createSlice({
  name: "vast-video",
  initialState,
  reducers: {
    addVideo: (state, { payload }) => {
      const existingVideoIndex = state.videos.findIndex(
        (video) => video.id === payload.id
      );
      if (existingVideoIndex !== -1) {
        state.videos[existingVideoIndex] = payload;
      } else {
        state.videos = [...state.videos, payload];
      }
    },
    addFilm: (state, { payload }) => {
      const existingVideoIndex = state.films.findIndex(
        (film) => film.id === payload.id
      );
      if (existingVideoIndex !== -1) {
        state.films[existingVideoIndex] = payload;
      } else {
        state.films = [...state.films, payload];
      }
    },
  },
});

export const userReducer = userSlice.reducer;
export const { addVideo, addFilm } = userSlice.actions;

export const selectLastVideos = (state) => state.user.videos;
export const selectUserFilms = (state) => state.user.films;
