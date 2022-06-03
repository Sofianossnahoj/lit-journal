import React from "react";
import "../sass/views/createNewEntry.scss";
import Header from "../components/header";
import JournalNote from "../components/JournalNote";
import MenuBar from "../components/MenuBar";

function CreateNewEntry() {
  return (
    <main className="create-new-entry">
      <Header />
      <h1>SPACE FOR SEARCH BUTTON</h1>
      <JournalNote />
      <MenuBar />
    </main>
  );
}

export default CreateNewEntry;
