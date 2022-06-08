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

  /*   const createEntry = useSelector(entryInfo) */

  useEffect(() => {
    if (booksStatus === "idle" && bookTitle !== "") {
      dispatch(fetchBooks());
    }
  }, [booksStatus, dispatch]);

  const test = (book) => {
    /*     console.log("book title: ", book.title);
    console.log("test i searchbooks.jsx", book.authors); */
    /*     dispatch(setBookData(book.title, book.authors)); */
    dispatch(setBookData(book));
    //console.log(book);
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
          <p className=" no-search-image search-image">No cover Image</p>
        ) : (
          <img
            className="search-image"
            src={book.imageUrl ? book.imageUrl.thumbnail : ""}
            alt="Cover image"
          />
        )}
        <div>
          <h4>{book.title}</h4>
          <p>{book.authors}</p>
        </div>
        {/* <p>{book.pages}</p> */}
        {/* <p>{book.infoLink}</p>
        <p className="search-result-description">{book.description}</p> */}
        <button onClick={() => test(book)} className="create-note-button">
          Create new note
        </button>
      </section>
      <br />

      {/* <p>{book.description}</p> */}
      {/* <p>{book.readingModes}</p> */}
      {/* Lägg in defaultbild som tomt värde */}
    </main>
  ));

  let bookContent;
  if (booksStatus === "loading") {
    // Use loader here
    bookContent = <h3>"Loading..."</h3>;
  } else if (booksStatus === "succeeded") {
    //console.log("Success!", books);
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
