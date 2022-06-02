import "../sass/components/menuBar.scss";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";

function MenuBar() {
  return (
    <nav>
      <Link to="/home">
        <article className="menu-button">
          <img src="src/images/house-grey.png" alt="home" className="menu-icons" />
          <p className="menu-button-text">Home</p>
        </article>
      </Link>
      <Link to="/create">
        <article className="menu-button">
          <img src="src/images/pen-grey.png" alt="home" className="menu-icons" />
          <p className="menu-button-text">Create Entry</p>
        </article>
      </Link>
      <Link to="/search">
        <article className="menu-button">
          <img src="src/images/magnifying-glass-grey.png" alt="search" className="menu-icons" />
          <p className="menu-button-text">Search</p>
        </article>
      </Link>
      <Link to="/">
        <SignOut />
      </Link>
    </nav>
  );
}

export default MenuBar;
