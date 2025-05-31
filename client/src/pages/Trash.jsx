import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Text from "../components/Text";
import { RestoreFromTrash, DeleteForever } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Swal from 'sweetalert2'
import {
  useGetTrashTransactionsQuery,
  usePermenantlyDeleteTransactionsMutation,
  useRestoreAllTransactionMutation,
  useRestoreTransactionMutation,
} from "../Redux/app/transactionApiSlice";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
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

function createData(id, title, amount, date, description, type, category) {
  return { id, title, amount, date, description, type, category };
}

// const rows = [
//   createData(
//     1,
//     "2025-05-01",
//     "Netflix Subscription",
//     "Entertainment",
//     "Monthly Netflix plan",
//     15.99,
//     "Expense"
//   ),
//   createData(
//     2,
//     "2025-05-02",
//     "Spotify Premium",
//     "Music",
//     "Premium music subscription",
//     9.99,
//     "Expense"
//   ),
// ];

const Trash = () => {
  const { data: isDelete, refetch: refetchTrash } =
    useGetTrashTransactionsQuery();

  const trashTransaction = isDelete;
  // console.log(trashTransaction);

  const [permanentlyDeleteTransaction] =
    usePermenantlyDeleteTransactionsMutation();

  const handleDelete = async (id) => {
    try {
      const res = await permanentlyDeleteTransaction(id).unwrap();
      await refetchTrash();
      // console.log("Deleted:", res);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: res.message || 'Transaction deleted permanently.',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      // console.error("Delete Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: error?.data?.message || 'Something went wrong while deleting.',
      });
    }
  };

  const [restoreTransaction] = useRestoreTransactionMutation();

  const handleRestore = async (id) => {
    try {
      const res = await restoreTransaction(id).unwrap();
      await refetchTrash();
      // console.log("Deleted:", res);
      Swal.fire({
        icon: 'success',
        title: 'Restored!',
        text: res.message || 'Transaction restored successfully.',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      // console.error("Delete Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Restore Failed',
        text: error?.data?.message || 'Something went wrong while restoring.',
      });
    }
  };

  const [restoreAllTransaction] = useRestoreAllTransactionMutation();
  const handleAllRestoreTransaction = async () => {
    try {
      const res = await restoreAllTransaction().unwrap();
      await refetchTrash()
      Swal.fire({
        icon: 'success',
        title: 'Restored!',
        text: res.message || 'All transactions restored successfully.',
        timer: 2000,
        showConfirmButton: false,
      });
      // console.log(res);
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Restore Failed',
        text: error?.data?.message || 'Something went wrong while restoring.',
      });
    }
  };

  const [deleteAllTransaction] = useRestoreAllTransactionMutation();
  const handleAllDeleteTransaction = async () => {
    try {
      const res = await deleteAllTransaction().unwrap();
      await refetchTrash()
      // console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: res.message || 'All soft-deleted transactions were permanently removed.',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Delete Failed',
        text: error?.data?.message || 'Something went wrong while deleting.',
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex justify-between items-center">
        <Text
          title={"Trash Transactions"}
          subTitle={"Here you can permanently delete or restore"}
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
        onClick={() => handleAllRestoreTransaction()}
         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Restore All
        </button>
        <button 
        onClick={() => handleAllDeleteTransaction()}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
          Delete All
        </button>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="trashed transactions table">
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
            {trashTransaction && trashTransaction.length > 0 ? (
              trashTransaction.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>
                    {new Date(row.date).toLocaleDateString("en-CA")}
                  </StyledTableCell>
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
                  <StyledTableCell
                    align="right"
                    sx={{ display: "flex", gap: "12px" }}
                  >
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() => handleDelete(row._id)}
                    >
                      <DeleteForever />
                    </IconButton>

                    <IconButton
                      sx={{ color: "green" }}
                      onClick={() => handleRestore(row._id)}
                    >
                      <RestoreFromTrash />
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
    </div>
  );
};

export default Trash;
