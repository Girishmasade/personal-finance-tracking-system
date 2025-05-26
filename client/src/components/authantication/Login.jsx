import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../Redux/app/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../Redux/api/authSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading, error }] = useLoginMutation();
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({
        email: form.email,
        password: form.password,
      }).unwrap();
      // console.log(userData);
      // After login API success
      dispatch(setCredentials({ user: userData.user, token: userData.token }));

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

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

            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form.remember}
                    onChange={handleChange}
                    name="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", color: "primary.main" }}
              >
                Forgot password?
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Don't Have an Account</Typography>

              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-600 underline"
              >
                Signup
              </Link>
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
            {error && <p style={{ color: "red" }}>Login Failed</p>}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
