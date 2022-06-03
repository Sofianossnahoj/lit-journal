import { configureStore } from "@reduxjs/toolkit";
import bookEntryReducer from "../features/bookEntrySlice";
import booksReducer from "../features/booksSlice";
import entriesReducer from "../features/entriesSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    bookEntryState: bookEntryReducer,
    booksApi: booksReducer,
    entriesState: entriesReducer,
    currentUser: userReducer,
  },
});
