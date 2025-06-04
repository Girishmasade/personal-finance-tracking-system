// src/pages/ForgetPassword.js
import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useForgetPasswordMutation } from '../../Redux/app/authApiSlice';
import {useNavigate } from 'react-router-dom';


const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate()

  const [forgetPassword, {isLoading}] = useForgetPasswordMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

     try {
        const res = await forgetPassword({email, newPassword}).unwrap()
      if (res.success) {
        setSuccessMsg(res.message);
        navigate("/login")
      } else {
        setErrorMsg(res.message || 'Something went wrong');
      }
    } catch (err) {
      setErrorMsg(err?.data?.message || 'Server error');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'} 
          </Button>
        </form>

        {successMsg && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMsg}
          </Alert>
        )}
        {errorMsg && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMsg}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default ForgetPassword;
