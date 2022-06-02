import "../sass/components/menuBar.scss";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";

function MenuBar() {
  return (
    <nav>
      <Link to="/home">
        <button className="menu-button">
          <img src="src/images/house-grey.png" alt="home" className="menu-icons" />
          Home
        </button>
      </Link>
      <Link to="/search">
        <button className="menu-button">
          <img src="src/images/magnifying-glass-grey.png" alt="search" className="menu-icons" />
          Search
        </button>
      </Link>
      <Link to="/">
        <SignOut />
      </Link>
    </nav>
  );
}

export default MenuBar;
