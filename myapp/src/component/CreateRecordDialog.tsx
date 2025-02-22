// src/components/CreateRecordDialog.tsx

import React, { useState, ChangeEvent } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import axios from "axios";

interface FormDatacreate {
  ledgerHeadId: string;
  loggedInUserId: string;
  paidBy: string;
  paidTo: string;
  incomeExpenseType: string;
}

interface CreateRecordDialogProps {
  open: boolean;
  handleClose: () => void;
  setMessage: (message: string) => void;
  setOpen: (open: boolean) => void;
  fetchAllRecords: () => void; 
}

const CreateRecordDialog: React.FC<CreateRecordDialogProps> = ({ open, handleClose, setMessage, setOpen, fetchAllRecords }) => {
  const [formData, setFormData] = useState<FormDatacreate>({
    ledgerHeadId: "",
    loggedInUserId: "",
    paidBy: "",
    paidTo: "",
    incomeExpenseType: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Authentication token missing.");
        return;
      }

      await axios.post("http://localhost:8080/income-expense/create", formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage("Record created successfully!");

      setFormData({
        ledgerHeadId: "",
        loggedInUserId: "",
        paidBy: "",
        paidTo: "",
        incomeExpenseType: "",
      });

      setOpen(false); 
      fetchAllRecords(); 
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data?.message || "Failed to create record.");
      } else if (error.request) {
        setMessage("No response from server. Please try again.");
      } else {
        setMessage("Network error. Please try again.");
      }
      console.error("Error creating record:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Income/Expense Record</DialogTitle>
      <DialogContent>
        {Object.keys(formData).map((key) => (
          <TextField
            key={key}
            type="text"
            fullWidth
            margin="normal"
            label={key.replace(/([A-Z])/g, " $1").trim()}
            name={key}
            value={formData[key as keyof FormDatacreate]}
            onChange={handleChange}
            variant="outlined"
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCreate} variant="contained" color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRecordDialog;
