import MenuBar from "../components/MenuBar";
import "../sass/views/bookDetails.scss";
import SearchBar from "../components/searchBar";
import { useSelector } from "react-redux";
import { entryInfo } from "../features/bookEntrySlice";
import { useNavigate } from "react-router-dom";

const BookDetails = () => {
  const book = useSelector(entryInfo);
  const navigate = useNavigate();

  const toJournalPage = () => {
    navigate("/create", { replace: true });
  };

  return (
    <section>
      <h2>LITerature Journal</h2>
      <hr />
      {/* <div className="hr" /> */}
      <SearchBar />
      <article>
        {!book.imageUrl ? (
          <p className=" no-search-image search-image">No cover Image</p>
        ) : (
          <img
            src={book.imageUrl.thumbnail}
            alt={book.title + "cover"}
            className="search-image"
          />
        )}
        <h2>{book.title}</h2>
        {!book.authors ? <h3>Author unknown</h3> : <h3>By {book.authors}</h3>}
        {!book.pages ? <p></p> : <p>{book.pages} pages </p>}
        {!book.pubDate ? <p></p> : <p> First published {book.pubDate}</p>}
        <hr />
        <button onClick={() => toJournalPage(book)} className="button-save">
          {" "}
          Create A Note{" "}
        </button>
        <h3>Book Description</h3>
        {!book.description ? (
          <p>Description missing</p>
        ) : (
          <p>{book.description}</p>
        )}
      </article>
      <MenuBar />
    </section>
  );
};

export default BookDetails;
