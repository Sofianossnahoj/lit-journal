import { useSelector } from "react-redux";
import { entryInfo } from "../features/bookEntrySlice";
import { useNavigate } from "react-router-dom";
import MenuBar from "../components/MenuBar";
import SearchBar from "../components/searchBar";
import "../sass/views/bookDetails.scss";

const BookDetails = () => {
  const book = useSelector(entryInfo);
  const navigate = useNavigate();

  const toJournalPage = () => {
    navigate("/create", { replace: true });
  };

  const navigateToSearch = () => {
    navigate("/search", { replace: true });
  };
  return (
    <main className="book-details-view">
      <h2>LITerature Journal</h2>
      <div className="hr" />
      <div onSubmit={navigateToSearch}>
        <SearchBar />
      </div>
      <article className="book-detail-container">
        {!book.imageUrl ? (
          <p className=" no-search-image search-image">No cover Image</p>
        ) : (
          <img
            src={book.imageUrl.thumbnail}
            alt={book.title + "cover"}
            className="search-image"
          />
        )}
        <section>
          <h2>{book.title}</h2>
          {!book.authors ? <h3>Author unknown</h3> : <h3>By {book.authors}</h3>}
          {!book.pages ? <p /> : <p>{book.pages} pages </p>}
          {!book.pubDate ? <p /> : <p> First published {book.pubDate}</p>}
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
        </section>
      </article>
      <MenuBar />
    </main>
  );
};

export default BookDetails;
