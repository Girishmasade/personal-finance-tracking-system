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
  
  const navigate = useNavigate()
  const [registerUser, {isLoading, error}] = useRegisterUserMutation()
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(form);
    try {
      const res = await registerUser(form).unwrap()
      Swal.fire({
        icon: "success",
        title: "Registration Successfully",
        text: "You can now log in",
        timer: 1500,
        showConfirmButton: false
      })
      // console.log('user registered', res);
      navigate('/login')
    } catch (error) {
      console.error('Registration error:', error);
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
      sx={{ height: "100vh", backgroundColor: "#f5f5f5" }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Register your Account
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Please enter your credentials to continue.
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="text"
              name="username"
              label="Username"
              variant="outlined"
              margin="normal"
              value={form.username}
              onChange={handleChange}
              required
            />

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
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
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
            <Box sx={{display: 'flex', justifyContent: 'space-between', paddingTop: '8px'}}>
              <Typography>
                Already Have an Account
              </Typography>

              <Link to='/login' className='text-blue-500 hover:text-blue-600 underline'>Login</Link>
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 2,
                py: 1.5,
                backgroundColor: '#111',
                '&:hover': { backgroundColor: '#333' }
              }}
            >
              {isLoading ? 'Signup...' : 'Signup'}
            </Button>
            {error && <p style={{color: 'red'}}>something went wrong</p>}
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
