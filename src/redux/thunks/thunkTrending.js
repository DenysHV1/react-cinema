import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, KEY } from "../helpSettings";
import axios from "axios";

export const searchPremiersFilms = createAsyncThunk(
  "top/searchTrending",
  async (__, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: 1,
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
  "top/searchTrendingByPage",
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
