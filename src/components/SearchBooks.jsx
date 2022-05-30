import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllBooks,
  getBooksStatus,
  getBooksError,
  fetchBooks,
} from "../features/booksSlice";
import SearchBar from "./SearchBar";

const SearchBooks = () => {
  const dispatch = useDispatch();

  const bookTitle = "";

  const books = useSelector(selectAllBooks);
  const booksStatus = useSelector(getBooksStatus);
  const error = useSelector(getBooksError);

  useEffect(() => {
    if (booksStatus === "idle" && bookTitle !== "") {
      dispatch(fetchBooks());
    }
  }, [booksStatus, dispatch]);

  const renderedBooks = books.map((book) => (
    <article className="book-list-card" key={book.id}>
      <h3>{book.title}</h3>
      <p>{book.authors}</p>
      <p>{book.description}</p>
      {/* <p>{book.readingModes}</p> */}
      {/* Lägg in defaultbild som tomt värde */}
      <img src={book.imageUrl ? book.imageUrl.thumbnail : ""} alt="test" />
    </article>
  ));

  let bookContent;
  if (booksStatus === "loading") {
    // Use loader here
    bookContent = <h3>"Loading..."</h3>;
  } else if (booksStatus === "succeeded") {
    console.log("Success!", books);
    bookContent = renderedBooks;
  } else if (booksStatus === "failed") {
    bookContent = <p>{error}</p>;
  }

  return (
    <section>
      <SearchBar data={books} />
      <article>{bookContent}</article>
    </section>
  );
};

export default SearchBooks;
