import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const KEY = "c2643356-4e36-4dbb-b65c-1cc28f60d650";

const instance = axios.create({
  baseURL: "https://kinopoiskapiunofficial.tech/api/v2.2/films",
  headers: { "X-API-KEY": KEY, "Content-Type": "application/json" },
});

export const searchPremiersFilms = createAsyncThunk(
  "premiers/searchPremiers",
  async (__, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const response = await instance.get(`/premieres`, {
        params: { year: state.films.year, month: state.films.month },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
