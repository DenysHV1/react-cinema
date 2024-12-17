import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, KEY } from "../helpSettings";
import axios from "axios";

export const reviewsPageThunk = createAsyncThunk(
  "reviewsPage/getInfoReviews",
  async (id, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
      };

      const response = await axios.get(`${BASE_URL}/3/review/${id}`, {
        params,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
