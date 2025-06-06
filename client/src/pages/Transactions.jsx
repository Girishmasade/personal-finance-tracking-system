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
import Loading from "../components/Loading";

const Transactions = () => {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All Types");
  const [category, setCategory] = useState("All Categories");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const { data, error, isLoading } = useGetTransactionsQuery();
  const transactions = data?.transaction || [];

  const filteredRows = transactions.filter(
    (row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (type === "All Types" || row.type === type) &&
      (category === "All Categories" || row.category === category) &&
      (month === "" || new Date(row.date).getMonth() + 1 === parseInt(month)) &&
      (year === "" || new Date(row.date).getFullYear() === parseInt(year))
  );

  const handleReset = () => {
    setSearch("");
    setType("All Types");
    setCategory("All Categories");
    setMonth("");
    setYear("");
  };

  const months = [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ];

  if(isLoading) {
    return <Loading/>
  }

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

        <Grid item xs={12} sm={6} md={3}>
          <TextField
            select
            fullWidth
            size="small"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <MenuItem value={"m"}>Months</MenuItem>
            {months.map((m) => (
              <MenuItem key={m.value} value={m.value}>
                {m.label}
              </MenuItem>
            ))}
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
            sx={{ height: "40px" }}
          >
            Reset Filters
          </Button>
        </Grid>
      </Grid>

      {/* Loading/Error Handling */}
      {isLoading && <Typography>Loading transactions...</Typography>}
      {error && (
        <Typography color="error">Failed to load transactions.</Typography>
      )}

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
