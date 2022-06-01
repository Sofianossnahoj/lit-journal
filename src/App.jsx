import React from "react";
import "./sass/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./views/LandingPage";
import HomeView from "./views/HomeView";
import CreateNewEntry from "./views/CreateNewEntry";
import SearchResults from "./views/SearchResults";
import ProtectedRoute from "./components/ProtectedRoute";
import MenuBar from "./components/MenuBar";

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
