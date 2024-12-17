import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, KEY } from "../helpSettings";
import axios from "axios";

export const searchDetailsAboutFilmByID = createAsyncThunk(
	"details/searchDetailsByID",
	async (id, thunkAPI) => {
	  try {
		const params = {
		  api_key: KEY,
		  language: "en-US",
		};
		const response = await axios.get(`${BASE_URL}/3/movie/${id}`, { params });
  
		return response.data;
	  } catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	  }
	}
  );

export const alternativeTitlesThunk = createAsyncThunk(
  "alternative_titles/get_titles",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/3/movie/${id}/alternative_titles?api_key=${KEY}&language=en-US`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const filmVideosThunk = createAsyncThunk(
	"lists/getFilmGallery",
	async (id, thunkAPI) => {
	  try {
		const response = await axios.get(
		  `${BASE_URL}/3/movie/${id}/videos?api_key=${KEY}&language=en-US`
		);
  
		return response.data;
	  } catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	  }
	}
  );

  export const reviewsThunk = createAsyncThunk(
	"reviews/getReviews",
	async (id, thunkAPI) => {
	  try {
		const response = await axios.get(
		  `${BASE_URL}/3/movie/${id}/reviews?api_key=${KEY}&language=en-US`
		);
  
		return response.data;
	  } catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	  }
	}
  );
