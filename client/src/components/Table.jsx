import {
  IconButton,
  ListItemIcon,
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Text from "./Text";
const dataTable = () => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      border: "1px solid #ccc",
      fontSize: 18,
      // borderRadius: '8px 8px 0 0',
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.grey[600],
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 18,
      border: "1px solid #ddd",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& td, & th": {
      border: "1px solid #ccc",
    },
    "&:last-child td, &:last-child th": {
      borderBottom: 0,
    },
    borderRadius: "8px", 
    overflow: "hidden", 
  }));

  function createData(date, category, description, amount, type) {
    return { date, category, description, amount, type };
  }

  const rows = [
    createData("7/18/2023", "Food", "Grocery shopping", 85.0, "Expense"),
    createData(
      "7/15/2023",
      "Freelance",
      "Website design project",
      500.0,
      "Income"
    ),
    createData("7/10/2023", "Utilities", "Electricity bill", 120.0, "Expense"),
    createData("7/5/2023", "Housing", "Rent payment", 1200.0, "Expense"),
    createData("7/1/2023", "Salary", "Monthly salary", 3500.0, "Income"),
  ];

  return (
    <div>
        <Text title={'Recent Transactions'}/>
   <TableContainer component={Paper} style={{ maxHeight: 500, overflowY: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell>Category</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Amount</StyledTableCell>
            <StyledTableCell>Type</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.date}>
              <StyledTableCell>{row.date}</StyledTableCell>
              <StyledTableCell>{row.category}</StyledTableCell>
              <StyledTableCell>{row.description}</StyledTableCell>
              <StyledTableCell sx={{fontWeight: '600'}}>${row.amount}</StyledTableCell>
              <StyledTableCell>
  <span
    style={{
      padding: "4px 8px",
      borderRadius: "6px",
      fontWeight: 400,
      backgroundColor: row.type === "Expense" ? "#fee2e2" : "#d1fae5",
      color: row.type === "Expense" ? "#b91c1c" : "#065f46",
    }}
  >
    {row.type}
  </span>
</StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ display: "flex", gap: "12px" }}
              >
                <IconButton sx={{ color: "red" }}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>

                <IconButton sx={{ color: "green" }}>
                  <BorderColorOutlinedIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default dataTable;
