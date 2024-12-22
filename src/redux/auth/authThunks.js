import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const KEY = "ee3e9c5f4ba904ebcf317d566e2eec32";
const BASE_URL = "https://api.themoviedb.org";

//this is taking token
export const createRequestTokenThunk = createAsyncThunk(
  "auth/createRequestToken",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/3/authentication/token/new`,
        {
          params: { api_key: KEY },
        }
      );
      return response.data.request_token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const validateTokenWithLoginThunk = createAsyncThunk(
  "auth/validateTokenWithLogin",
  async ({ username, password, requestToken }, thunkAPI) => {

    console.log({ username, password, requestToken });
    try {
      const response = await axios.post(
        `${BASE_URL}/3/authentication/token/validate_with_login`,
        {
          username,
          password,
          request_token: requestToken,
        },
        {
          params: { api_key: KEY },
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.request_token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createSessionThunk = createAsyncThunk(
  "auth/createSession",
  async (validatedToken, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/3/authentication/session/new`,
        { request_token: validatedToken },
        {
          params: { api_key: KEY },
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
