import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL, KEY } from "../helpSettings";
import axios from "axios";

export const companyPageThunk = createAsyncThunk(
  "castPage/getInfoCast",
  async (id, thunkAPI) => {
    try {
      // const params = {
      //   api_key: KEY,
      //   language: "en-US",
      // };

      const response = await axios.get(`${BASE_URL}/3/company/${id}?api_key=${KEY}&language=en-US`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
