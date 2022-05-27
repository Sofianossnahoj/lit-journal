import React from "react";
import Form, { JournalNote } from "../components/form";
import Header from "../components/header";
import "../sass/views/CreateNewEntry.scss";

function CreateNewEntry() {
  return (
    <main className="create-new-entry">
      <Header />
      <h1>SPACE FOR SEARCH BUTTON</h1>
      <JournalNote />
      <Form />
    </main>
  );
}

export default CreateNewEntry;