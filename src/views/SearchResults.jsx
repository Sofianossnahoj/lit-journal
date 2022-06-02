import "../sass/views/searchResults.scss";
import SearchBooks from "../components/SearchBooks";
import MenuBar from "../components/MenuBar";
import Header from "../components/header";

const SearchResults = () => {
  return (
    <main className="search-results">
      <Header />
      <SearchBooks />
      <MenuBar />
    </main>
  );
};

export default SearchResults;
