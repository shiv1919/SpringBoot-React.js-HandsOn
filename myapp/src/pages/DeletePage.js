import { useState } from "react";
import "./DeletePage.css"; 

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
    <div className="delete-container">
      <h2>Delete Record</h2>
      <input
        type="text"
        placeholder="Enter ID to delete"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <button onClick={handleDelete}>Delete</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default DeletePage;
