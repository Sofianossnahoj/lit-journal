import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const bookEntrySlice = createSlice({
  name: "bookEntryState",
  initialState: {
    bookEntryInfo: [],
    /*     title: "",
    authors: "",
    pages: "",
    image: "", */
  },
  reducers: {
    setBookData: (state, action) => {
      state.bookEntryInfo = action.payload;
    },
  },
});

/* console.log("Testar slices!"); */

export const entryInfo = (state) => state.bookEntryState.bookEntryInfo;
/* export const entryTitle = (state) => state.bookEntryState.title;
export const entryAuthors = (state) => state.bookEntryState.authors;
export const entryGenre = (state) => state.bookEntryState.genre;
export const entryPages = (state) => state.bookEntryState.pages;
export const entryImage = (state) => state.bookEntryState.image; */

export const { setBookData } = bookEntrySlice.actions;

export default bookEntrySlice.reducer;
