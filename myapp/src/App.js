import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
import ReadPage from "./pages/ReadPage";
import UpdatePage from "./pages/UpdatePage";
import DeletePage from "./pages/DeletePage";
import Loginregister from "./pages/Loginregister";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} /> {/* Redirect to Home */}
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/read" element={<ReadPage />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path="/delete" element={<DeletePage />} />
        <Route path="/loginregister" element={<Loginregister />} />
      </Routes>
    </Router>
  );
}

export default App;
