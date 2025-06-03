import React, { useState } from "react";
import Table from "../components/Table";
import Text from "../components/Text";
import {
  Button,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useGetTransactionsQuery } from "../Redux/app/transactionApiSlice";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [category, setCategory] = useState("All Categories");

  const { data, error, isLoading } = useGetTransactionsQuery();
  const transactions = data?.transaction || [];

  const filteredRows = transactions.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase()) &&
    (type === "All Types" || row.type === type) &&
    (category === "All Categories" || row.category === category)
  );

  const handleReset = () => {
    setSearch("");
    setType("All Types");
    setCategory("All Categories");
  };

  return (
    <Box p={2}>
      <Box mb={2}>
        <Text title="Transactions" />
        <Typography variant="body2" color="text.secondary">
          Manage and view all your financial tracker
        </Typography>
      </Box>

      {/* Filters Grid */}
      <Grid container spacing={2} alignItems="center" mb={2}>
        {/* Search Field */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            placeholder="Search transactions..."
            fullWidth
            size="small"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Type Dropdown */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            size="small"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="All Types">All Types</MenuItem>
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </TextField>
        </Grid>

        {/* Category Dropdown */}
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            size="small"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="All Categories">All Categories</MenuItem>
            <MenuItem value="Housing">Housing</MenuItem>
            <MenuItem value="Transportation">Transportation</MenuItem>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Utilities">Utilities</MenuItem>
            <MenuItem value="Salary">Salary</MenuItem>
            <MenuItem value="Freelance">Freelance</MenuItem>
          </TextField>
        </Grid>

        {/* Reset Button */}
        <Grid item xs={12} sm={6} md={3}>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            size="small"
            onClick={handleReset}
            sx={{ height: '40px' }}
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>

      {/* Loading/Error Handling */}
      {isLoading && <Typography>Loading transactions...</Typography>}
      {error && <Typography color="error">Failed to load transactions.</Typography>}

      {/* Table Display */}
      {!isLoading && !error && (
        <Box pt={4}>
         <Table rows={filteredRows} />
        </Box>
      )}
    </Box>
  );
};

export default Transactions;
