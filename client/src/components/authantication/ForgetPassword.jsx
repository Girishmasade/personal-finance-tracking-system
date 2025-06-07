import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Box,
} from '@mui/material';
import { useForgetPasswordMutation } from '../../Redux/app/authApiSlice';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await forgetPassword({ email, newPassword }).unwrap();
      if (res.success) {
        setSuccessMsg(res.message);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setErrorMsg(res.message || 'Something went wrong');
      }
    } catch (err) {
      setErrorMsg(err?.data?.message || 'Server error');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        backgroundImage: `url('/forgetPass_background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          maxWidth: 420,
          width: '100%',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          color: '#fff',
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
          sx={{ color: '#fff' }}
        >
          Reset Password
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            placeholder='Enter your email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#fff',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
              input: { color: '#fff' },
              label: { color: '#fff' },
            }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            placeholder='Enter your new password'
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#fff',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
              },
              input: { color: '#fff' },
              label: { color: '#fff' },
            }}
            InputLabelProps={{ shrink: true }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              py: 1.5,
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#222' },
            }}
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
    </Box>
  );
};

export default ForgetPassword;
