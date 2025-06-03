import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Button,
  DialogActions,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import {
  useAddTransactionMutation,
  useGetTransactionsQuery,
  useUpdateTransactionsMutation,
} from "../Redux/app/transactionApiSlice";

const AddTransactions = ({ opentransaction, setOpenTransaction, editData = null }) => {
  const [addTransaction, { isLoading, error }] = useAddTransactionMutation();
  const [updateTransaction] = useUpdateTransactionsMutation();
  const { refetch } = useGetTransactionsQuery();

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "Expense",
    description: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        date: editData.date || "",
        amount: Number(editData.amount) || 0,
        category: editData.category || "",
        type: editData.type || "Expense",
        description: editData.description || "",
      });
    } else {
      setForm({
        date: "",
        amount: "",
        category: "",
        type: "Expense",
        description: "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "amount" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.date || !form.amount || !form.category || !form.type) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all required fields",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      if (editData) {
        await updateTransaction({
          id: editData._id,
          updateData: { ...form },
        }).unwrap();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Transaction Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await addTransaction(form).unwrap();

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Transaction Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      refetch();
      setOpenTransaction(false);
    } catch (error) {
      console.error("Transaction Error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong!",
        text: error.message || "Please try again later.",
      });
    }
  };

  return (
    <Dialog
      open={opentransaction}
      onClose={() => setOpenTransaction(false)}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, px: 2, py: 1.5 },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box display="flex" alignItems="center" justifyContent="space-between" px={1}>
          <DialogTitle sx={{ fontWeight: "bold", p: 0 }}>
            {editData ? "Edit Transaction" : "Add Transaction"}
          </DialogTitle>
          <IconButton onClick={() => setOpenTransaction(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {editData
              ? "Update your transaction details below."
              : "Add a new transaction to your finance tracker."}
          </Typography>

          <TextField
            fullWidth
            type="date"
            name="date"
            label="Date"
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            type="number"
            name="amount"
            label="Amount"
            value={form.amount}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />

          <TextField
            select
            fullWidth
            name="type"
            label="Type"
            value={form.type}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            name="category"
            label="Category"
            value={form.category}
            onChange={handleChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="Housing">Housing</MenuItem>
            <MenuItem value="Transportation">Transportation</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
            <MenuItem value="Healthcare">Healthcare</MenuItem>
            <MenuItem value="Shopping">Shopping</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
          </TextField>

          <TextField
            fullWidth
            name="description"
            label="Description"
            placeholder="Transaction description"
            value={form.description}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenTransaction(false)} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            sx={{ backgroundColor: "#111", "&:hover": { backgroundColor: "#333" } }}
          >
            {isLoading ? "Saving..." : editData ? "Update" : "Save"}
          </Button>
          {error && (
            <Typography color="error" variant="caption">
              Failed to submit transaction
            </Typography>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTransactions;
