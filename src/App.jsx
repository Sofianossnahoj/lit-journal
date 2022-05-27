import React from "react";
import "./sass/App.scss";
import CreateNewEntry from "./views/CreateNewEntry";
import HomeView from "./views/HomeView";
import SignIn from "./components/SignIn";

function App() {
  return (
    <div className="App">
      <HomeView />
      <br />
      <CreateNewEntry />
      <br />
      <SignIn />
    </div>
  );
}

export default App;
