import { createSlice } from "@reduxjs/toolkit";
import { createRequestTokenThunk, createSessionThunk } from "./authThunks";

const initialState = {
  requestToken: null,
  sessionId: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.requestToken = null;
      state.sessionId = null;
      state.isAuthenticated = false;
      localStorage.removeItem("sessionId");
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createRequestTokenThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createRequestTokenThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.requestToken = action.payload;
      })
      .addCase(createRequestTokenThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createSessionThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSessionThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sessionId = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("sessionId", action.payload);
      })
      .addCase(createSessionThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
