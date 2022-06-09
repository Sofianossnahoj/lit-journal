import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useFirebase from "../firebase/useFirebase";
import { resetSearch } from "../features/booksSlice";
import "../sass/components/menuBar.scss";

function MenuBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSignOut } = useFirebase();

  const navigateToSearch = () => {
    navigate("/search", { replace: true });
    dispatch(resetSearch());
  };

  return (
    <nav>
      <article className="menu-button">
        <Link to="/home">
          <img
            src="src/images/house-grey.png"
            alt="home"
            className="menu-icons"
          />
        </Link>
        <p className="menu-button-text">Home</p>
      </article>
      <article className="menu-button">
        <Link to="/create">
          <img
            src="src/images/pen-grey.png"
            alt="home"
            className="menu-icons"
          />
        </Link>
        <p className="menu-button-text">Create Entry</p>
      </article>
      <article className="menu-button">
        <img
          src="src/images/magnifying-glass-grey.png"
          alt="search"
          className="menu-icons"
          onClick={navigateToSearch}
        />
        <p className="menu-button-text">Search</p>
      </article>
      <article className="menu-button" onClick={handleSignOut}>
        <Link to="/">
          <img
            src="src/images/arrow-right-from-bracket-grey.png"
            alt="logout"
            className="menu-icons"
          />
        </Link>
        <p className="menu-button-text">Sign out</p>
      </article>
    </nav>
  );
}

export default MenuBar;
