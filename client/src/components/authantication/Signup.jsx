import {
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../Redux/app/authApiSlice";
import Swal from "sweetalert2";

const SignupPage = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form).unwrap();
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now log in",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error?.data?.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <Grid
      container
      component="main"
      sx={{
        minHeight: "100vh",
        backgroundImage: `url('/signup_background.png')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.45)", // slightly lighter overlay for blur effect
          zIndex: 1,
        },
      }}
    >
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        sx={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 5,
            borderRadius: 4,
            backgroundColor: "rgba(255, 255, 255, 0.15)", // transparent white
            backdropFilter: "blur(12px)", // blur effect
            WebkitBackdropFilter: "blur(12px)", // Safari support
            boxShadow:
              "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 4px 16px 0 rgba(0,0,0,0.2)",
            width: "100%",
            maxWidth: 450,
            mx: "auto",
            color: "#fff", // text white for contrast
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#fff" }}
          >
            Register your Account
          </Typography>

          <Typography
            variant="body1"
            mb={4}
            sx={{ color: "rgba(255, 255, 255, 0.85)" }}
          >
            Please enter your credentials to continue.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="text"
              name="username"
              label="Username"
              variant="filled"
              margin="normal"
              value={form.username}
              onChange={handleChange}
              required
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 1,
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                "& .MuiFilledInput-underline:before": {
                  borderBottomColor: "rgba(255,255,255,0.3)",
                },
                "& .MuiFilledInput-underline:hover:before": {
                  borderBottomColor: "#fff",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#fff",
                },
              }}
            />

            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              variant="filled"
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 1,
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                "& .MuiFilledInput-underline:before": {
                  borderBottomColor: "rgba(255,255,255,0.3)",
                },
                "& .MuiFilledInput-underline:hover:before": {
                  borderBottomColor: "#fff",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#fff",
                },
              }}
            />

            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              variant="filled"
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      sx={{ color: "#fff" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: 1,
                input: { color: "#fff" },
                "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#fff" },
                "& .MuiFilledInput-underline:before": {
                  borderBottomColor: "rgba(255,255,255,0.3)",
                },
                "& .MuiFilledInput-underline:hover:before": {
                  borderBottomColor: "#fff",
                },
                "& .MuiFilledInput-underline:after": {
                  borderBottomColor: "#fff",
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pt: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.8)" }}
              >
                Already Have an Account?
              </Typography>
              <Link
                to="/login"
                style={{
                  color: "#90caf9",
                  textDecoration: "underline",
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 4,
                py: 1.5,
                backgroundColor: "rgba(144, 202, 249, 0.85)",
                color: "#000",
                fontWeight: "bold",
                fontSize: "1.1rem",
                borderRadius: 3,
                "&:hover": {
                  backgroundColor: "rgba(100, 181, 246, 0.9)",
                },
              }}
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>

            {error && (
              <Typography
                variant="body2"
                color="error"
                sx={{ mt: 3, textAlign: "center" }}
              >
                {error?.data?.message || "Something went wrong."}
              </Typography>
            )}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
