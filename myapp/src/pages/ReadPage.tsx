import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateRecordDialog from "../component/CreateRecordDialog";  // Import the dialog
import DeleteRecordDialog from "../component/DeleteRecordDialog"; 
import EditRecordDialog from '../component/EditRecordDialog';  // Adjust the path as necessary
import SearchBox from '../component/SearchBox'; // Import the SearchBox component
import axios from "axios";

import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

interface Record {
  id: number;
  incomeExpenseId: number;
  ledgerHeadId: number;
  paymentDate: string;
  loggedInUserId: number;
  paidBy: string;
  paidTo: string;
  incomeExpenseType: string;
}

interface FormData {
  id: string;
  ledgerHeadId: string;
  loggedInUserId: string;
  paidBy: string;
  paidTo: string;
  incomeExpenseType: string;
}


const ReadAllPage: React.FC = () => {

  const navigate = useNavigate();
  const [records, setRecords] = useState<Record[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const [recordById, setRecordById] = useState<Record | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [message, setMessage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const handleDeleteSuccess = () => {
    setRecords(records.filter((record) => record.id !== selectedId));
  };

  const handleEdit = (record: Record) => {
    setSelectedRecord(record); 
    setEditDialogOpen(true); 
  };

  const handleUpdate = (formData: FormData) => {
    if (selectedRecord) {
      const updatedRecords = records.map((record) =>
        record.id === selectedRecord.id
          ? {
              ...record,
              ...formData,
              id: Number(formData.id),  
              ledgerHeadId: Number(formData.ledgerHeadId), 
              loggedInUserId: Number(formData.loggedInUserId), 
            }
          : record
      );
  
      setRecords(updatedRecords);
      setEditDialogOpen(false); 
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchAllRecords();
  }, []);

  

  const fetchAllRecords = async () => {
    setLoading(true);
    setError("");
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication token missing.");
      }
  
      const response = await axios.get<Record[]>("http://localhost:8080/income-expense/getall", {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setRecords(response.data);
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data?.message || "Failed to fetch records.");
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("Network error. Please try again.");
      }
      setRecords([]);
      console.error("Error fetching records:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container maxWidth="lg" sx={{ color: "white" }}>
      <SearchBox
        id={id}
        setId={setId}
        loading={loading}
        setLoading={setLoading}
        setError={setError}
        setRecordById={setRecordById}
      />

      {recordById && (
        <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
          <Typography variant="h6">Record Details</Typography>
          <Typography>ID: {recordById.id}</Typography>
          <Typography>Income/Expense ID: {recordById.incomeExpenseId}</Typography>
          <Typography>Ledger Head ID: {recordById.ledgerHeadId}</Typography>
          <Typography>Payment Date: {new Date(recordById.paymentDate).toLocaleString()}</Typography>
          <Typography>User ID: {recordById.loggedInUserId}</Typography>
          <Typography>Paid By: {recordById.paidBy}</Typography>
          <Typography>Paid To: {recordById.paidTo}</Typography>
          <Typography>Type: {recordById.incomeExpenseType}</Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={() => setRecordById(null)}
            sx={{ mt: 2 }}
          >
            Close
          </Button>
        </Paper>
      )}

      <Paper elevation={3} sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
          <Typography variant="h5">All Records</Typography>
          <Button variant="contained" color="success" onClick={() => setOpen(true)}>
            Add
          </Button>
        </Box>
        <CreateRecordDialog open={open} handleClose={() => setOpen(false)} setMessage={setMessage} setOpen={setOpen} fetchAllRecords={fetchAllRecords}   />
        {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 2 }} />}
        {error && <Typography color="error">{error}</Typography>}
        {records.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Income/Expense ID</TableCell>
                  <TableCell>Ledger Head ID</TableCell>
                  <TableCell>Payment Date</TableCell>
                  <TableCell>User ID</TableCell>
                  <TableCell>Paid By</TableCell>
                  <TableCell>Paid To</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.id}</TableCell>
                    <TableCell>{record.incomeExpenseId}</TableCell>
                    <TableCell>{record.ledgerHeadId}</TableCell>
                    <TableCell>{new Date(record.paymentDate).toLocaleString()}</TableCell>
                    <TableCell>{record.loggedInUserId}</TableCell>
                    <TableCell>{record.paidBy}</TableCell>
                    <TableCell>{record.paidTo}</TableCell>
                    <TableCell>{record.incomeExpenseType}</TableCell>
                    <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEdit(record)}>
                      Edit
                    </Button>
                    </TableCell>
                    <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => {
                       setSelectedId(record.id);
                       setOpenDialog(true);
                      }}
                      sx={{
                        width: "32px",  
                        height: "32px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <DeleteRecordDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onDeleteSuccess={handleDeleteSuccess}
          selectedId={selectedId}
        />
        <EditRecordDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onUpdate={handleUpdate}
          initialData={
          selectedRecord
            ? {
              ...selectedRecord,
              id: selectedRecord.id.toString(),
              ledgerHeadId: selectedRecord.ledgerHeadId.toString(),
              loggedInUserId: selectedRecord.loggedInUserId.toString(),
            }
            : null
          }
          fetchAllRecords={fetchAllRecords}  
        />
      </Paper>
    </Container>
  );
};

export default ReadAllPage;