import React from 'react';
import axios from 'axios';
import { Box, TextField, Button, CircularProgress, Typography } from '@mui/material';

interface IncomeExpenseRecord {
  id: number;
  incomeExpenseId: number;
  ledgerHeadId: number;
  paymentDate: string;
  loggedInUserId: number;
  paidBy: string;
  paidTo: string;
  incomeExpenseType: string;
}

interface SearchBoxProps {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setRecordById: React.Dispatch<React.SetStateAction<IncomeExpenseRecord | null>>;
}

const SearchBox: React.FC<SearchBoxProps> = ({ id, setId, loading, setLoading, setError, setRecordById }) => {
  const fetchRecordById = async () => {
    if (!id) {
      setError("Please enter an ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<IncomeExpenseRecord>(
        `http://localhost:8080/income-expense/get/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRecordById(response.data);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 404) {
          setError("ID not found");
        } else {
          setError(error.response.data?.message || `Error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else if (error.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      setRecordById(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h4"></Typography>
      <Box display="flex" gap={2}>
        <TextField
          label="Enter ID"
          value={id}
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) {
              setId(e.target.value);
            }
          }}
          sx={{ backgroundColor: "white" }}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={fetchRecordById}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Search"}
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBox;
