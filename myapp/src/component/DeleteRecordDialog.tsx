// src/components/DeleteRecordDialog.tsx

import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import axios from "axios";

interface DeleteRecordDialogProps {
  open: boolean;
  onClose: () => void;
  selectedId: number | null;
  onDeleteSuccess: () => void; 
}

const DeleteRecordDialog: React.FC<DeleteRecordDialogProps> = ({ open, onClose, selectedId, onDeleteSuccess }) => {
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/income-expense/delete/${selectedId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onDeleteSuccess(); 
      onClose(); 
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data?.message || "Failed to delete record.");
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("Network error. Please try again.");
      }
      console.error("Error deleting record:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the record with ID {selectedId}?
        </DialogContentText>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message if any */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteRecordDialog;
