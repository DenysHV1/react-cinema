import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../helpSettings";

//1. NuwPlaying
export const searchNuwPlaying = createAsyncThunk(
  "nuw_paying/searchNuwPlaying",
  async (__, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: 1,
      };
      const response = await axios.get(`${BASE_URL}/3/movie/now_playing`, {
        params,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchNuwPlayingByPage = createAsyncThunk(
  "nuw_paying/searchNuwPlayingByPage",
  async (page, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: page,
      };
      const response = await axios.get(`${BASE_URL}/3/movie/now_playing`, {
        params,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//2. Popular
export const searchPopular = createAsyncThunk(
  "popular/searchPopular",
  async (__, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: 1,
      };
      const response = await axios.get(`${BASE_URL}/3/movie/popular`, {
        params,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchPopularByPage = createAsyncThunk(
  "popular/searchPopularByPage",
  async (page, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: page,
      };
      const response = await axios.get(`${BASE_URL}/3/movie/popular`, {
        params,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//3. TopRated
export const searchTopRated = createAsyncThunk(
  "top_rated/searchTopRated",
  async (__, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: 1,
      };
      const response = await axios.get(`${BASE_URL}/3/movie/top_rated`, {
        params,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchTopRatedByPage = createAsyncThunk(
  "top_rated/searchTopRatedByPage",
  async (page, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: page,
      };
      const response = await axios.get(`${BASE_URL}/3/movie/top_rated`, {
        params,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
//4. Upcoming
export const searchUpcoming = createAsyncThunk(
  "upcoming/searchUpcoming",
  async (__, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: 1,
      };
      const response = await axios.get(`${BASE_URL}/3/movie/upcoming`, {
        params,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const searchUpcomingByPage = createAsyncThunk(
  "upcoming/searchUpcomingByPage",
  async (page, thunkAPI) => {
    try {
      const params = {
        api_key: KEY,
        language: "en-US",
        page: page,
      };
      const response = await axios.get(`${BASE_URL}/3/movie/upcoming`, {
        params,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
