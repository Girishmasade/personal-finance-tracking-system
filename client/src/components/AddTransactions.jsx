import React, { useState } from 'react';
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
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AddTransactions = ({ opentransaction, setOpenTransaction }) => {
  const [form, setForm] = useState({
    date: '',
    amount: '',
    category: '',
    type: 'Expense',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    console.log(form);
    setOpenTransaction(false);
  };

  return (
    <Dialog
      open={opentransaction}
      onClose={() => setOpenTransaction(false)}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          px: 2,
          py: 1.5
        }
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between" px={1}>
        <DialogTitle sx={{ fontWeight: 'bold', p: 0 }}>Add Transaction</DialogTitle>
        <IconButton onClick={() => setOpenTransaction(false)} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Add a new transaction to your finance tracker.
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
          <MenuItem value="Other">Other</MenuItem>
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
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: '#111',
            '&:hover': {
              backgroundColor: '#333'
            }
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactions;
