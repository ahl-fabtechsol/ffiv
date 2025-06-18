import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  role: null,
  isLoggedIn: false,
  user: null,
  contract: null,
  provider: null,
  account: null,
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
      state.contract = null;
      state.provider = null;
      state.account = null;
    },

    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setContract: (state, { payload }) => {
      state.contract = payload.contract;
      state.provider = payload.provider;
      state.account = payload.account;
    },
  },
});

export const { login, logout, setContract, setUser } = authSlice.actions;

export default authSlice.reducer;
