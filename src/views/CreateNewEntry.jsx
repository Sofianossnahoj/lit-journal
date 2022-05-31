import React from "react";
import JournalNote from "../components/JournalNote";
import Header from "../components/header";
import "../sass/views/CreateNewEntry.scss";

function CreateNewEntry() {
  return (
    <main className="create-new-entry">
      <Header />
      <h1>SPACE FOR SEARCH BUTTON</h1>
      <JournalNote />
    </main>
  );
}

export default CreateNewEntry;
