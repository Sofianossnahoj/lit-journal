import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../features/booksSlice";
import "../sass/components/searchBar.scss";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();

    dispatch(fetchBooks(searchTerm));
    setSearchTerm("");
  };

  return (
    <article className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          className="search-bar-text"
          type="text"
          placeholder="Search for books or authors"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </form>
    </article>
  );
}

export default SearchBar;
