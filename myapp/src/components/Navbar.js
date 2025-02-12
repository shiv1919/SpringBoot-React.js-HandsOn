import React from "react";
import { Link } from "react-router-dom"; 
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="d-flex gap-4 nav-links">
        <Link className="nav-link" to="/create">Create</Link>
        <Link className="nav-link" to="/read">Read</Link>
        <Link className="nav-link" to="/update">Update</Link>
        <Link className="nav-link" to="/delete">Delete</Link>
      </div>
      <div className="login-register">
        <Link className="nav-link" to="/loginregister">Login/Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;
