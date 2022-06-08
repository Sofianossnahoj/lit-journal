import React from "react";
import "../sass/views/CreateNewEntry.scss";
import JournalNote from "../components/JournalNote";
import MenuBar from "../components/MenuBar";

function CreateNewEntry() {
  return (
    <main>
      <section className="create-new-entry">
        <h2>LITerature Journal</h2>
        <div className="hr" />
        <JournalNote />
      </section>
      <MenuBar />
    </main>
  );
}

export default CreateNewEntry;
