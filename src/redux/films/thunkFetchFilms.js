import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const KEY = "ee3e9c5f4ba904ebcf317d566e2eec32";
const BASE_URL = "https://api.themoviedb.org";

export const searchPremiersFilms = createAsyncThunk(
  "top/searchPremiers",
  async (__, thunkAPI) => {
    const state = thunkAPI.getState();

    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: state.films.page,
      };

      const response = await axios.get(`${BASE_URL}/3/trending/movie/day`, {
        params,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchPremiersFilmsByPage = createAsyncThunk(
  "top/searchTopByPage",
  async (page, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: page,
      };

      const response = await axios.get(`${BASE_URL}/3/trending/movie/day`, {
        params,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const searchDetailsAboutFilmByID = createAsyncThunk('details/searchDetailsByID', async(id, thunkAPI) => {
  try {
    const params = {
      api_key: KEY,
      language: "en-US",
    }
    const response = await axios.get(`${BASE_URL}/3/movie/${id}`, {params});

    return response.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message)
  }
})