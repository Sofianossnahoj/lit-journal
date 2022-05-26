import React from "react";
import "./sass/App.scss";
import CreateNewEntry from "./views/CreateNewEntry";
import HomeView from "./views/HomeView";

function App() {
  return (
    <div className="App">
      <HomeView />
      <br />
      <CreateNewEntry />
    </div>
  );
}

export default App;
