import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      if (action) sessionStorage.setItem("user", action.payload);
    },

    logout: (state) => {
      state.isLoggedIn = false;
      sessionStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
