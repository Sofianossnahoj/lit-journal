import { useEffect } from "react";
import "../sass/components/searchBooks.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectAllBooks,
  getBooksStatus,
  getBooksError,
  fetchBooks,
} from "../features/booksSlice";
import { setBookData } from "../features/bookEntrySlice";
import SearchBar from "./SearchBar";

const SearchBooks = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bookTitle = "";

  const books = useSelector(selectAllBooks);
  const booksStatus = useSelector(getBooksStatus);
  const error = useSelector(getBooksError);

  useEffect(() => {
    if (booksStatus === "idle" && bookTitle !== "") {
      dispatch(fetchBooks());
    }
  }, [booksStatus, dispatch]);

  const createNote = (book) => {
    dispatch(setBookData(book));
    navigate("/create", { replace: true });
  };

  const toBookPage = (book) => {
    dispatch(setBookData(book));
    navigate("/book-details", { replace: true });
  };

  const renderedBooks = books.map((book) => (
    <main className="search-result" key={book.id}>
      <section onClick={() => toBookPage(book)} className=" book-list-card">
        {!book.imageUrl ? (
          <p className=" no-search-image search-image">No cover image</p>
        ) : (
          <img
            className="search-image"
            src={book.imageUrl ? book.imageUrl.thumbnail : ""}
            alt="Cover image"
          />
        )}
        <div>
          <h4 className="search-title">{book.title}</h4>
          <p className="search-authors">{book.authors}</p>
          <button
            onClick={(event) => {
              event.stopPropagation();
              createNote(book)
            }}
            className="create-note-button"
          >Create New Note</button>
        </div>
      </section>
    </main>
  ));

  let bookContent;
  if (booksStatus === "loading") {
    bookContent = <h3>"Loading..."</h3>;
  } else if (booksStatus === "succeeded") {
    bookContent = renderedBooks;
  } else if (booksStatus === "failed") {
    bookContent = <p>{error}</p>;
  }

  return (
    <section className="search-books">
      <SearchBar data={books} />
      <article>{bookContent}</article>
    </section>
  );
};

export default SearchBooks;
