import { useState } from "react";

function UpdatePage() {
  const [formData, setFormData] = useState({
    id: "",
    ledgerHeadId: "",
    loggedInUserId: "",
    paidBy: "",
    paidTo: "",
    incomeExpenseType: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData.id) {
      setMessage("Please enter an ID.");
      return;
    }

    try {
      const token=localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/income-expense/update", {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        setMessage("Record updated successfully!");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to update record.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        textAlign: "center",
        paddingTop: "20px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Update Payment Record</h2>
      {["id", "ledgerHeadId", "loggedInUserId", "paidBy", "paidTo", "incomeExpenseType"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.replace(/([A-Z])/g, " $1").trim()}
          value={formData[field]}
          onChange={handleChange}
          style={{
            padding: "10px",
            width: "250px",
            marginBottom: "10px",
            border: "2px solid #00b4c4",
            borderRadius: "5px",
            fontSize: "16px",
          }}
        />
      ))}
      <button
        onClick={handleUpdate}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
      >
        Update
      </button>
      {message && <p style={{ marginTop: "10px", fontWeight: "bold", color: "#333" }}>{message}</p>}
    </div>
  );
}

export default UpdatePage;
