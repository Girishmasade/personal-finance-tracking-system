import { Box } from "@mui/material";
import {RiseLoader } from "react-spinners";

const Loading = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        backgroundColor: "#f5f5f5",
      }}
    >
        <RiseLoader size={50} color="#1976d2"  />
    </Box>
  );
};

export default Loading;
