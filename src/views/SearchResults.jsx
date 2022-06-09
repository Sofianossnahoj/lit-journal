import SearchBooks from "../components/SearchBooks";
import MenuBar from "../components/MenuBar";
import "../sass/views/searchResults.scss";

const SearchResults = () => {
  return (
    <main className="search-results">
      <h2>LITerature Journal</h2>
      <div className="hr" />
      <SearchBooks />
      <MenuBar />
    </main>
  );
};

export default SearchResults;
