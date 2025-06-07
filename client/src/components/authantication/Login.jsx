import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Link as MuiLink,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/app/authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../Redux/api/authSlice";
import Swal from "sweetalert2";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({
        email: form.email,
        password: form.password,
      }).unwrap();

      dispatch(setCredentials({ user: userData.user, token: userData.token }));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error?.data?.message ||
          "Please check your credentials and try again.",
      });
    }
  };

  const { token } = useSelector((state) => state.auth);
  if (token) return <Navigate to={"/dashboard"} />;

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "100vh",
        backgroundImage: "url('/login_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backdropFilter: "blur(5px)", // fallback in case browser supports it on Grid
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 4,
            width: { xs: "90vw", sm: "400px" },
            background: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            color: "#fff",
            border: "1px solid rgba(255, 255, 255, 0.18)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Login to Your Account
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Please enter your credentials to continue.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              margin="normal"
              value={form.email}
              onChange={handleChange}
              required
              InputLabelProps={{
                style: { color: "#fff" },
              }}
              InputProps={{
                style: { color: "#fff" }, // white input text
              }}
            />

            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={form.password}
              onChange={handleChange}
              required
              InputLabelProps={{ style: { color: "#fff" } }}
              InputProps={{
                style: { color: "#fff" }, // white input text
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
            />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: 3,
                mt: 2,
              }}
            >
              <MuiLink
                component={Link}
                to="/forget-password"
                underline="hover"
                color="inherit"
                sx={{ fontSize: 14 }}
              >
                Forgot Password?
              </MuiLink>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">Don't have an account?</Typography>
                <MuiLink
                  component={Link}
                  to="/register"
                  underline="hover"
                  sx={{ fontWeight: 500 }}
                  color="inherit"
                >
                  Sign Up
                </MuiLink>
              </Box>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: "#111",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
