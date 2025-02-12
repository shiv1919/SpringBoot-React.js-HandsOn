import React from "react";
import { Link } from "react-router-dom"; 

function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#00b4c4",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: "20px" }}>
        <Link
          to="/Home"
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            backgroundColor: "#9cdad5",
            color: "#333",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e0e0e0";
            e.target.style.color = "#000";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#9cdad5";
            e.target.style.color = "#333";
          }}
        >
          Home
        </Link>
        <Link
          to="/create"
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            backgroundColor: "#9cdad5",
            color: "#333",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e0e0e0";
            e.target.style.color = "#000";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#9cdad5";
            e.target.style.color = "#333";
          }}
        >
          Create
        </Link>
        <Link
          to="/read"
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            backgroundColor: "#9cdad5",
            color: "#333",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e0e0e0";
            e.target.style.color = "#000";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#9cdad5";
            e.target.style.color = "#333";
          }}
        >
          Read
        </Link>
        <Link
          to="/update"
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            backgroundColor: "#9cdad5",
            color: "#333",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e0e0e0";
            e.target.style.color = "#000";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#9cdad5";
            e.target.style.color = "#333";
          }}
        >
          Update
        </Link>
        <Link
          to="/delete"
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            backgroundColor: "#9cdad5",
            color: "#333",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e0e0e0";
            e.target.style.color = "#000";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#9cdad5";
            e.target.style.color = "#333";
          }}
        >
          Delete
        </Link>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <Link
          to="/loginregister"
          style={{
            padding: "8px 20px",
            borderRadius: "100px",
            backgroundColor: "#9cdad5",
            color: "#333",
            fontWeight: "bold",
            textDecoration: "none",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#e0e0e0";
            e.target.style.color = "#000";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#9cdad5";
            e.target.style.color = "#333";
          }}
        >
          Login/Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
