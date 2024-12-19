import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../helpSettings";

export const getChangesThunk = createAsyncThunk(
  "changesHome/getChangesHome",
  async (page, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: page
      };
      const response = await axios.get(`${BASE_URL}/3/movie/now_playing`, {params});
      return response.data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
