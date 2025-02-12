import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import CreatePage from "./pages/CreatePage";
import ReadPage from "./pages/ReadPage";
import UpdatePage from "./pages/UpdatePage";
import DeletePage from "./pages/DeletePage";
import Loginregister from "./pages/Loginregister";

function App() {
  const title = "Capital Management";

  return (
    <Router>
      <Navbar />
      <motion.div 
        style={{ display: "flex", justifyContent: "center", marginTop: "220px" }}
      >
        {title.split("").map((char, index) => (
          <motion.span
            key={index}
            style={{
              fontSize: "5rem",
              fontWeight: "bold",
              margin: "0 5px",
            }}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
          >
            {char === " " ? "\u00A0" : char} {}
          </motion.span>
        ))}
      </motion.div>

      <Routes>
        <Route path="/create" element={<CreatePage />} />
        <Route path="/read" element={<ReadPage />} />
        <Route path="/update" element={<UpdatePage />} />
        <Route path="/delete" element={<DeletePage />} />
        <Route path="/Loginregister" element={<Loginregister/>}/>
      </Routes>
    </Router>
  );
}

export default App;
