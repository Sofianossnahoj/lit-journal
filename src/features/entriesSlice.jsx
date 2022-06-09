import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const entriesSlice = createSlice({
  name: "entriesState",
  initialState: {
    entries: [],
  },
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
    createEntry: (state, action) => {
      const newEntry = produce(state, (draftEntry) => {
        draftEntry.entries.push(action.payload);
      });
      return newEntry;
    },
    deleteEntry: (state, action) => {
      const removeEntry = produce(state, (draftDelete) => {
        draftDelete.entries.slice(action.payload);
      });
      return removeEntry;
    },
  },
});

export const getEntries = (state) => state.entriesState.entries;

export const { setEntries, createEntry, deleteEntry } = entriesSlice.actions;

export default entriesSlice.reducer;
