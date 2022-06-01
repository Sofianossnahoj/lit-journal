import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";

export const entriesSlice = createSlice({
  name: "entriesState",
  initialState: {
    entries: []
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
    }
    /* deleteEntry */
    /* editEntry */
  }
})

export const getEntries = (state) => state.entriesState.entries;

export const { setEntries, createEntry } = entriesSlice.actions;

export default entriesSlice.reducer;