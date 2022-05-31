import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../features/booksSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    booksApi: booksReducer,
    currentUser: userReducer,
  },
});
