import React from "react";
import "../sass/views/CreateNewEntry.scss";
import JournalNote from "../components/JournalNote";
import Header from "../components/header";

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
