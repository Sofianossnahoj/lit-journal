import MenuBar from "../components/MenuBar";
import "../sass/views/bookDetails.scss";
import SearchBar from "../components/searchBar";
import { useDispatch, useSelector } from "react-redux";
import { entryInfo } from "../features/bookEntrySlice";
import { useNavigate } from "react-router-dom";
import { setBookData } from "../features/bookEntrySlice";

const BookDetails = () => {
  const book = useSelector(entryInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate;

  console.log(book);

  const toJournalPage = (book) => {
    dispatch(setBookData(book));
    navigate("/create", { replace: true });
  };

  return (
    <section>
      <h2>LITerature Journal</h2>
      <hr />
      {/* <div className="hr" /> */}
      <SearchBar />
      <article>
        <img
          src={book.imageUrl.thumbnail}
          alt={book.title + "cover"}
          className="search-image"
        />
        <h2>{book.title}</h2>
        <h3>By {book.authors}</h3>
        <p>{book.pages} pages </p>
        <p> First published {book.pubDate}</p>
        <hr />
        <button onClick={() => toJournalPage(book)} className="button-save">
          {" "}
          Create A Note{" "}
        </button>
        <h3>Book Description</h3>
        <p>{book.description}</p>
      </article>
      <MenuBar />
    </section>
  );
};

export default BookDetails;
