import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
};

const lastVideoSlice = createSlice({
  name: "vast-video",
  initialState,
  reducers: {
	addVideo: (state, { payload }) => {
		console.log("Payload received:", payload);
		const existingVideoIndex = state.videos.findIndex(
		  (video) => video.id === payload.id
		);
		if (existingVideoIndex !== -1) {
		  console.log("Updating existing video at index:", existingVideoIndex);
		  state.videos[existingVideoIndex] = payload;
		} else {
		  console.log("Adding new video:", payload);
		  state.videos = [...state.videos, payload]
		}
		console.log(state.videos);
	  },
  },
});

export const lastVideoReducer = lastVideoSlice.reducer;
export const { addVideo } = lastVideoSlice.actions;

export const selectLastVideos = (state) => state.lastVideos.videos;
