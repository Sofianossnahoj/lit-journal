import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  books: [],
  status: "idle" /* | "loading" | "succeeded" | "failed" */,
  error: null,
};

const API_KEY = "AIzaSyACQPLJWd2lR7jAYBHVOsAqL0asUaZtWv8";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (searchTerm) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${API_KEY}`
      );
      console.log("Response: ", response.data.items);
      return response.data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        pages: item.volumeInfo.pageCount,
        description: item.volumeInfo.description,
        imageUrl: item.volumeInfo.imageLinks,
        infoLink: item.volumeInfo.infoLink,
      }));
    } catch (err) {
      return err.message;
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  // Does this reducer do anything?
  reducers: {
    bookAdded: {
      reducer(state, action) {
        const nextState = produce(state, (draftState) => {
          draftState.books.push(action.payload);
        });
        return nextState;
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        // console.log(action.payload);
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllBooks = (state) => state.booksApi.books;
export const getBooksStatus = (state) => state.booksApi.status;
export const getBooksError = (state) => state.booksApi.error;

export const { bookAdded } = booksSlice.actions;

export default booksSlice.reducer;
