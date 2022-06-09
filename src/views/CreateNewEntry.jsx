import React from "react";
import { useNavigate } from "react-router-dom";
import "../sass/views/CreateNewEntry.scss";

import JournalNote from "../components/JournalNote";
import SearchBar from "../components/searchBar";
import MenuBar from "../components/MenuBar";

function CreateNewEntry() {
  const navigate = useNavigate();
  const navigateToSearch = () => {
    navigate("/search", { replace: true });
  };
  return (
    <main>
      <section className="create-new-entry">
        <h2>LITerature Journal</h2>
        <div className="hr" />
        <div onSubmit={navigateToSearch}>
          <SearchBar />
        </div>
        <JournalNote />
      </section>
      <MenuBar />
    </main>
  );
}

export default CreateNewEntry;
