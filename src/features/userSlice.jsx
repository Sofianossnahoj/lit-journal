import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "currentUser",
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      // console.log("State and action: ", state, action);
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const selectUser = (state) => state.currentUser.user;

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;