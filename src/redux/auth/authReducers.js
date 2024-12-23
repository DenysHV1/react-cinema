import { createSlice } from "@reduxjs/toolkit";
// import { createRequestTokenThunk, createSessionThunk } from "./authThunks";

const initialState = {
  // token: null,
  sessionId: false,
  // loading: false,
  // error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.sessionId = false;
    },
    loginUser: (state) => {
      state.sessionId = true;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     ///createRequestTokenThunk
  //     .addCase(createRequestTokenThunk.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(createRequestTokenThunk.fulfilled, (state, { payload }) => {
  //       state.loading = false;
  //       state.token = payload;
  //     })
  //     .addCase(createRequestTokenThunk.rejected, (state, { payload }) => {
  //       state.loading = false;
  //       state.error = payload;
  //     })
  //     /// createSessionThunk
  //     .addCase(createSessionThunk.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(createSessionThunk.fulfilled, (state, { payload }) => {
  //       state.loading = false;
  //       state.sessionId = payload.session_id;
  //       console.log(payload.session_id);
  //     })
  //     .addCase(createSessionThunk.rejected, (state, { payload }) => {
  //       state.loading = false;
  //       state.error = payload;
  //     });
  // },
});

export const { logoutUser, loginUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
