import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

interface FormData {
  id: string;
  ledgerHeadId: string;
  loggedInUserId: string;
  paidBy: string;
  paidTo: string;
  incomeExpenseType: string;
}

interface EditRecordDialogProps {
  open: boolean;
  onClose: () => void;
  onUpdate: (formData: FormData) => void;
  fetchAllRecords: () => void; 
  initialData: FormData | null;
}


const EditRecordDialog: React.FC<EditRecordDialogProps> = ({
  open,
  onClose,
  onUpdate,
  fetchAllRecords,
  initialData,
}) => {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    ledgerHeadId: "",
    loggedInUserId: "",
    paidBy: "",
    paidTo: "",
    incomeExpenseType: "",
  });

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id.toString(),
        ledgerHeadId: initialData.ledgerHeadId.toString(),
        loggedInUserId: initialData.loggedInUserId.toString(),
        paidBy: initialData.paidBy,
        paidTo: initialData.paidTo,
        incomeExpenseType: initialData.incomeExpenseType,
      });
    }
  }, [initialData]); 

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!formData.id) {
      setMessage("Please enter an ID.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8080/income-expense/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Record updated successfully!");
      onUpdate(formData);
      onClose();
      fetchAllRecords(); 
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data?.message || "Failed to update record.");
      } else if (error.request) {
        setMessage("No response from server. Please try again.");
      } else {
        setMessage("Network error. Please try again.");
      }
      console.error("Error updating record:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Record</DialogTitle>
      <DialogContent>
        {[
          "id",
          "ledgerHeadId",
          "loggedInUserId",
          "paidBy",
          "paidTo",
          "incomeExpenseType",
        ].map((field) => (
          <TextField
            key={field}
            name={field}
            label={field.replace(/([A-Z])/g, " $1").trim()}
            value={formData[field as keyof FormData] || ""}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        ))}
        {message && <Typography color="error">{message}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRecordDialog;
