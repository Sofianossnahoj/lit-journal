import React from "react";
import { Link } from "react-router-dom";
import SignOut from "./SignOut";

function MenuBar() {
  return (
    <nav>
      <Link to="/home"><button>Home</button></Link>
      <Link to="/create"><button>Create</button></Link>
      <Link to="/search"><button>Search</button></Link>
      <Link to="/"><SignOut /></Link>
    </nav>
  );
}

export default MenuBar;
