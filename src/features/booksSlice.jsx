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
      return response.data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        pages: item.volumeInfo.pageCount,
        description: item.volumeInfo.description,
        imageUrl: item.volumeInfo.imageLinks,
        infoLink: item.volumeInfo.infoLink,
        pubDate: item.volumeInfo.publishedDate,
      }));
    } catch (err) {
      return err.message;
    }
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    resetSearch: (state) => {
      state.books = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
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

export const { resetSearch } = booksSlice.actions;

export default booksSlice.reducer;
