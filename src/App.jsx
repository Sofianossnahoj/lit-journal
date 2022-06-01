import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./sass/App.scss";
import LandingPage from "./views/LandingPage";
import HomeView from "./views/HomeView";
import CreateNewEntry from "./views/CreateNewEntry";
import SearchResults from "./views/SearchResults";
import MenuBar from "./components/MenuBar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomeView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateNewEntry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchResults />
              </ProtectedRoute>
            }
          />
        </Routes>
        {/* Look to make this not appear on LandingPage */}
        <MenuBar />
      </div>
    </Router>
  );
}

export default App;
