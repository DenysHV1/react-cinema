import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../helpSettings";

export const searchThunk = createAsyncThunk(
	"search/getFilmBySearch",
	async (query, thunkAPI) => {
	  try {
		const response = await axios.get(
		  `${BASE_URL}/3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`
		);
  
		return response.data;
	  } catch (error) {
		return thunkAPI.rejectWithValue(error.message);
	  }
	}
  );