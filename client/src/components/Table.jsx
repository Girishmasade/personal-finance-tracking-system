import React from "react";
import {
  IconButton,
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const DataTable = ({ rows = [] }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      border: "1px solid #ccc",
      fontSize: 18,
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
  }));

  return (
    <TableContainer component={Paper} style={{ maxHeight: 500 }}>
      <Table sx={{ minWidth: 600 }} aria-label="transactions table">
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
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.date}</StyledTableCell>
                <StyledTableCell>{row.category}</StyledTableCell>
                <StyledTableCell>{row.description}</StyledTableCell>
                <StyledTableCell sx={{ fontWeight: "600" }}>
                  ${row.amount}
                </StyledTableCell>
                <StyledTableCell>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontWeight: 400,
                      backgroundColor:
                        row.type === "Expense" ? "#fee2e2" : "#d1fae5",
                      color: row.type === "Expense" ? "#b91c1c" : "#065f46",
                    }}
                  >
                    {row.type}
                  </span>
                </StyledTableCell>
                <StyledTableCell align="right" sx={{ display: "flex", gap: "12px" }}>
                  <IconButton sx={{ color: "red" }}>
                    <DeleteOutlineOutlinedIcon />
                  </IconButton>
                  <IconButton sx={{ color: "green" }}>
                    <BorderColorOutlinedIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={6} align="center">
                No results found.
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
