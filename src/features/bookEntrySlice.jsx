import { createSlice } from "@reduxjs/toolkit";

export const bookEntrySlice = createSlice({
  name: "bookEntryState",
  initialState: {
    bookEntryInfo: [],
  },
  reducers: {
    setBookData: (state, action) => {
      state.bookEntryInfo = action.payload;
    },
  },
});

export const entryInfo = (state) => state.bookEntryState.bookEntryInfo;

export const { setBookData } = bookEntrySlice.actions;

export default bookEntrySlice.reducer;
