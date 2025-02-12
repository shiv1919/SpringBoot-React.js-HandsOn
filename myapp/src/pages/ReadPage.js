import React, { useState } from "react";
import axios from "axios";

const ReadAllPage = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [recordById, setRecordById] = useState(null);
  const [showRecords, setShowRecords] = useState(false);

  const fetchAllRecords = async () => {
    setLoading(true);
    try {
      const token=localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/income-expense/getall", {
        headers: {
          Authorization:`Bearer ${token}`
        }
      });
      setRecords(response.data);
      setShowRecords(true);
      setError("");
    } catch (error) {
      setError(error.response?.data?.error || "No response from server");
      setRecords([]);
      setShowRecords(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecordById = async () => {
    if (!id) {
      setError("Please enter an ID.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/income-expense/get/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecordById(response.data);
      setError("");
    } catch (error) {
      setError(error.response?.data?.error || "No response from server");
      setRecordById(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "20px",
        backgroundColor: "#695252",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "45%",
          padding: "20px",
          backgroundColor: "#2d2d2d",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>All Records</h2>
        {error && <p style={{ color: "red", margin: "10px 0" }}>{error}</p>}
        <button
          onClick={fetchAllRecords}
          disabled={loading}
          style={{
            padding: "8px 16px",
            marginBottom: "20px",
            borderRadius: "4px",
            backgroundColor: loading ? "#6c6c6c" : "#5fcd65",
            color: "#060a0c",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading..." : "Fetch All Records"}
        </button>
        {!loading && showRecords && records.length > 0 && (
          <table
            style={{
              width: "100%",
              color: "#000",
              borderCollapse: "collapse",
              backgroundColor: "#6c6c6c",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid white" }}>
                <th>ID</th>
                <th>Income/Expense ID</th>
                <th>Ledger Head ID</th>
                <th>Payment Date</th>
                <th>User ID</th>
                <th>Paid By</th>
                <th>Paid To</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} style={{ borderBottom: "1px solid #614c4c" }}>
                  <td>{record.id}</td>
                  <td>{record.incomeExpenseId}</td>
                  <td>{record.ledgerHeadId}</td>
                  <td>{new Date(record.paymentDate).toLocaleString()}</td>
                  <td>{record.loggedInUserId}</td>
                  <td>{record.paidBy}</td>
                  <td>{record.paidTo}</td>
                  <td>{record.incomeExpenseType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div
        style={{
          maxWidth: "45%",
          padding: "20px",
          backgroundColor: "#2d2d2d",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Find Record by ID</h2>
        <input
          type="text"
          placeholder="Enter ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            padding: "8px",
            marginRight: "10px",
            borderRadius: "4px",
            border: "1px solid #070505",
          }}
        />
        <button
          onClick={fetchRecordById}
          disabled={loading}
          style={{
            padding: "8px 16px",
            marginBottom: "20px",
            borderRadius: "4px",
            backgroundColor: loading ? "#6c6c6c" : "#5fcd65",
            color: "#060a0c",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Loading..." : "Fetch"}
        </button>
        {recordById && (
          <div style={{ marginTop: "20px" }}>
            <h3>Record Details</h3>
            <p>
              <strong>ID:</strong> {recordById.id}
            </p>
            <p>
              <strong>Income/Expense ID:</strong> {recordById.incomeExpenseId}
            </p>
            <p>
              <strong>Ledger Head ID:</strong> {recordById.ledgerHeadId}
            </p>
            <p>
              <strong>Payment Date:</strong> {new Date(recordById.paymentDate).toLocaleString()}
            </p>
            <p>
              <strong>User ID:</strong> {recordById.loggedInUserId}
            </p>
            <p>
              <strong>Paid By:</strong> {recordById.paidBy}
            </p>
            <p>
              <strong>Paid To:</strong> {recordById.paidTo}
            </p>
            <p>
              <strong>Type:</strong> {recordById.incomeExpenseType}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadAllPage;
