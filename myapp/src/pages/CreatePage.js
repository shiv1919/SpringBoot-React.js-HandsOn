import { useState } from "react";

function CreatePage() {
  const [formData, setFormData] = useState({
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

  const handleCreate = async () => {
    try {
      const token=localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/income-expense/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Record created successfully!");
        setFormData({
          ledgerHeadId: "",
          loggedInUserId: "",
          paidBy: "",
          paidTo: "",
          incomeExpenseType: "",
        });
      } else {
        setMessage("Failed to create record.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        backgroundColor:"white",
      }}
    >
      <h2 style={{ marginBottom: "15px", fontSize: "20px",color:"black" }}>
        Create Income/Expense Record
      </h2>
      {Object.keys(formData).map((key) => (
        <input
          key={key}
          type="text"
          name={key}
          placeholder={key.replace(/([A-Z])/g, " $1").trim()}
          value={formData[key]}
          onChange={handleChange}
          style={{
            width: "90%",
            padding: "10px",
            margin: "8px 0",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      ))}
      <button
        onClick={handleCreate}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Create
      </button>
      {message && (
        <p style={{ marginTop: "10px", color: "green", fontWeight: "bold" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default CreatePage;
