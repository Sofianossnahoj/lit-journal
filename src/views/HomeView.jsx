import React from "react";
import Header from "../components/header";

function HomeView() {
  return (
    <section>
      <Header />
      <h5>You don't have any journal entries yet!</h5>

      <button>Create New Entry</button>
    </section>
  );
}

export default HomeView;
