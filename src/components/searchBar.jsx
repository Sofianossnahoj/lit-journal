import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBooks } from "../features/booksSlice";

function SearchBar() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchTerm);

    if (searchTerm === "") {
      return alert("Please enter a serch term");
    }

    dispatch(fetchBooks(searchTerm));
    setSearchTerm();
  };

  return (
    <article className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search books"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </form>
    </article>
  );
}

export default SearchBar;
