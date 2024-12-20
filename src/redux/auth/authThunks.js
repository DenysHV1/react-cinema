// authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../helpSettings";


// Генерация токена запроса
export const createRequestTokenThunk = createAsyncThunk(
  "auth/createRequestToken",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/3/authentication/token/new`, {
        params: { api_key: KEY },
      });
      return response.data.request_token;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Создание сессии после авторизации токена
export const createSessionThunk = createAsyncThunk(
  "auth/createSession",
  async (requestToken, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/3/authentication/session/new`,
        { request_token: requestToken },
        { params: { api_key: KEY } }
      );
      return response.data.session_id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
