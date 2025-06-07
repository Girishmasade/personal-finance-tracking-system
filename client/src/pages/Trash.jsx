import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RestoreFromTrash, DeleteForever } from "@mui/icons-material";
import Swal from "sweetalert2";
import {
  useDeleteAllTransactionMutation,
  useGetTrashTransactionsQuery,
  usePermenantlyDeleteTransactionsMutation,
  useRestoreAllTransactionMutation,
  useRestoreTransactionMutation,
} from "../Redux/app/transactionApiSlice";

// Styled components
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${TableCell.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Trash = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { data: trashTransaction = [], refetch: refetchTrash } = useGetTrashTransactionsQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true
  });
  const [permanentlyDeleteTransaction] = usePermenantlyDeleteTransactionsMutation();
  const [restoreTransaction] = useRestoreTransactionMutation();
  const [restoreAllTransaction] = useRestoreAllTransactionMutation();
  const [deleteAllTransaction] = useDeleteAllTransactionMutation();

  const handleDelete = async (id) => {
    try {
      const res = await permanentlyDeleteTransaction(id).unwrap();
      await refetchTrash();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: res.message || "Transaction deleted permanently.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error?.data?.message || "Something went wrong while deleting.",
      });
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await restoreTransaction(id).unwrap();
      await refetchTrash();
      Swal.fire({
        icon: "success",
        title: "Restored!",
        text: res.message || "Transaction restored successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Restore Failed",
        text: error?.data?.message || "Something went wrong while restoring.",
      });
    }
  };

  const handleAllRestoreTransaction = async () => {
    try {
      const res = await restoreAllTransaction().unwrap();
      await refetchTrash();
      Swal.fire({
        icon: "success",
        title: "Restored!",
        text: res.message || "All transactions restored successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Restore Failed",
        text: error?.data?.message || "Something went wrong while restoring.",
      });
    }
  };

  const handleAllDeleteTransaction = async () => {
    try {
      const confirmed = await Swal.fire({
        icon: "warning",
        title: "Are you sure?",
        text: "This will permanently delete all trash transactions.",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete all!",
      });

      if (confirmed.isConfirmed) {
        const res = await deleteAllTransaction().unwrap(); // Make sure your API supports this
        await refetchTrash();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: res.message || "All trash transactions deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: error?.data?.message || "Something went wrong while deleting.",
      });
    }
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
        mb={2}
      >
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Trash Transactions
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Here you can permanently delete or restore your deleted transactions.
          </Typography>
        </Box>

        <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} width={{ xs: "100%", sm: "auto" }}>
          <Button
            fullWidth={isMobile}
            onClick={handleAllRestoreTransaction}
            variant="contained"
            color="success"
          >
            Restore All
          </Button>
          <Button
            fullWidth={isMobile}
            onClick={handleAllDeleteTransaction}
            variant="contained"
            color="error"
          >
            Delete All
          </Button>
        </Box>
      </Box>

      {/* Responsive Table */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <TableContainer component={Paper}>
          <Table stickyHeader>
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
              {trashTransaction.length > 0 ? (
                trashTransaction.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell>{new Date(row.date).toLocaleDateString()}</StyledTableCell>
                    <StyledTableCell>{row.category}</StyledTableCell>
                    <StyledTableCell>{row.description}</StyledTableCell>
                    <StyledTableCell sx={{ fontWeight: 600 }}>${row.amount}</StyledTableCell>
                    <StyledTableCell>
                      <Box
                        component="span"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: "6px",
                          fontWeight: 500,
                          fontSize: "0.75rem",
                          backgroundColor: row.type === "Expense" ? "#fee2e2" : "#d1fae5",
                          color: row.type === "Expense" ? "#b91c1c" : "#065f46",
                        }}
                      >
                        {row.type}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Box display="flex" justifyContent="flex-end" gap={1}>
                        <IconButton color="error" onClick={() => handleDelete(row._id)}>
                          <DeleteForever />
                        </IconButton>
                        <IconButton color="success" onClick={() => handleRestore(row._id)}>
                          <RestoreFromTrash />
                        </IconButton>
                      </Box>
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
      </Box>
    </Box>
  );
};

export default Trash;