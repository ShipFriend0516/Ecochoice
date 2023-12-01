import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
  },
});
