import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Stack,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { useGetTransactionsQuery, useUploadTransacationFileMutation } from "../Redux/app/transactionApiSlice";
import Swal from "sweetalert2";

const UploadTransaction = ({ openUploadFile, setOpenUploadFile }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const [uploadTransacationFile, { isLoading, error }] = useUploadTransacationFileMutation();
   const { refetch } = useGetTransactionsQuery();
  
  const handleUpload = async () => {
    try {
      // console.log(file);

      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadTransacationFile(formData).unwrap();
      refetch()
      // console.log("Uploading file:", res);
      if (res.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Transaction Uploaded Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setOpenUploadFile(false);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.data.message,
      });
      setOpenUploadFile(false);
    }
  };

  if (error) {
    console.error("Error uploading file:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Failed to upload file. Please try again.",
    });
  }

  return (
    <Dialog
      open={openUploadFile}
      onClose={() => setOpenUploadFile(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Upload Transaction
        <IconButton
          aria-label="close"
          onClick={() => setOpenUploadFile(false)}
          sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={3}>
          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#f9f9f9",
              "&:hover": { backgroundColor: "#f1f1f1" },
            }}
            onClick={() => document.getElementById("upload-input").click()}
          >
            <input
              type="file"
              accept=".csv,.xlsx,.pdf"
              id="upload-input"
              hidden
              onChange={handleFileChange}
            />
            <UploadFileIcon fontSize="large" color="primary" />
            <Typography variant="subtitle1" mt={1}>
              {file ? file.name : "Click to upload or drag and drop a file"}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenUploadFile(false)} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          variant="contained"
          color="primary"
          disabled={isLoading}
        >
          {isLoading ? "uploading...." : "upload"}
        </Button>
      </DialogActions>
      {/* {error ? <p>Here is the error to upload a file</p> : ""} */}
    </Dialog>
  );
};

export default UploadTransaction;
