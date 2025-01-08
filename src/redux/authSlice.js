import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  role: null,
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.role = payload.role;
      state.isLoggedIn = true;
      state.user = payload.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.role = null;
      state.isLoggedIn = false;
      state.user = null;
    },

    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
