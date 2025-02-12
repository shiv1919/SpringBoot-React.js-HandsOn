import { useState } from "react";
import "./UpdatePage.css"; 

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
    <div className="update-container">
      <h2>Update Payment Record</h2>
      <input type="text" name="id" placeholder="Enter ID" value={formData.id} onChange={handleChange} />
      <input type="text" name="ledgerHeadId" placeholder="Ledger Head ID" value={formData.ledgerHeadId} onChange={handleChange} />
      <input type="text" name="loggedInUserId" placeholder="Logged-in User ID" value={formData.loggedInUserId} onChange={handleChange} />
      <input type="text" name="paidBy" placeholder="Paid By" value={formData.paidBy} onChange={handleChange} />
      <input type="text" name="paidTo" placeholder="Paid To" value={formData.paidTo} onChange={handleChange} />
      <input type="text" name="incomeExpenseType" placeholder="Income/Expense Type" value={formData.incomeExpenseType} onChange={handleChange} />
      <button onClick={handleUpdate}>Update</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UpdatePage;
