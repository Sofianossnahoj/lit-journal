import "../sass/components/menuBar.scss";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";

function MenuBar() {
  return (
    <nav>
      <Link to="/home">
        <article className="menu-button">
          <img
            src="src/images/house-grey.png"
            alt="home"
            className="menu-icons"
          />
          <p className="menu-button-text">Home</p>
        </article>
      </Link>
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
        <Link to="/search">
          <img
            src="src/images/magnifying-glass-grey.png"
            alt="search"
            className="menu-icons"
          />
        </Link>
        <p className="menu-button-text">Search</p>
      </article>
      <Link to="/">
        <SignOut />
      </Link>
    </nav>
  );
}

export default MenuBar;
