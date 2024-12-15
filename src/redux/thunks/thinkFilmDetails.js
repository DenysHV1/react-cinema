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