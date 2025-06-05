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
  Link as MuiLink 
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
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
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
  // console.log(token);
  
  if (token) {
    // console.log("redirecting....");
    return <Navigate to={"/dashboard"} />;
  }

  return (
    <Grid
      container
      component="main"
      sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Login to Your Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Removed Remember me checkbox */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mb: 3,
                mt: 2,
              }}
            >
              {/* Forgot Password */}
              <MuiLink
                component={Link}
                to="/forget-password"
                underline="hover"
                color="primary"
                sx={{ fontSize: 14 }}
              >
                Forgot Password?
              </MuiLink>

              {/* Sign Up Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography variant="body2">Don't have an account?</Typography>
                <MuiLink
                  component={Link}
                  to="/register"
                  underline="hover"
                  color="primary"
                  sx={{ fontWeight: 500 }}
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
              {isLoading ? "Logging..." : " Login"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
