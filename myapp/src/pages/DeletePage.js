import { useState } from "react";

function DeletePage() {
  const [id, setId] = useState("");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!id) {
      setMessage("Please enter an ID.");
      return;
    }

    try {
      const token=localStorage.getItem("token");
      const response = await fetch(`http://localhost:8080/income-expense/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization:`Bearer ${token}`
        },
      });

      if (response.ok) {
        setMessage("Record deleted successfully!");
      } else {
        setMessage("Failed to delete record.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "start",
      height: "100vh",
      textAlign: "center",
      paddingTop: "50px"
    }}>
      <h2 style={{ marginBottom: "20px" }}>Delete Record</h2>
      <input
        type="text"
        placeholder="Enter ID to delete"
        value={id}
        onChange={(e) => setId(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginBottom: "10px",
          border: "2px solid #00b4c4",
          borderRadius: "5px",
          fontSize: "16px",
        }}
      />
      <button 
        onClick={handleDelete}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ff4d4d",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#cc0000"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#ff4d4d"}
      >
        Delete
      </button>
      {message && <p style={{ marginTop: "10px", fontWeight: "bold", color: "#333" }}>{message}</p>}
    </div>
  );
}

export default DeletePage;
