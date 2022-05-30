import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./sass/App.scss";
import LandingPage from "./views/LandingPage";
import HomeView from "./views/HomeView";
import SignIn from "./components/SignIn";
import CreateNewEntry from "./views/CreateNewEntry";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/home">Home</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/create">Create New Entry</Link>
        </nav>
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
          <Route path="/signin" element={<SignIn />} />
          <Route path="/create" element={<CreateNewEntry />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
