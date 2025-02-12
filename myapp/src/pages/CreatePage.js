import { useState } from "react";
import "./CreatePage.css"; 

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
        setFormData({ ledgerHeadId: "", loggedInUserId: "", paidBy: "", paidTo: "", incomeExpenseType: "" });
      } else {
        setMessage("Failed to create record.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="create-container">
      <h2>Create Income/Expense Record</h2>
      <input type="text" name="ledgerHeadId" placeholder="Ledger Head ID" value={formData.ledgerHeadId} onChange={handleChange} />
      <input type="text" name="loggedInUserId" placeholder="Logged-in User ID" value={formData.loggedInUserId} onChange={handleChange} />
      <input type="text" name="paidBy" placeholder="Paid By" value={formData.paidBy} onChange={handleChange} />
      <input type="text" name="paidTo" placeholder="Paid To" value={formData.paidTo} onChange={handleChange} />
      <input type="text" name="incomeExpenseType" placeholder="Income/Expense Type" value={formData.incomeExpenseType} onChange={handleChange} />
      <button onClick={handleCreate}>Create</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default CreatePage;
