import React from 'react';
import { Box, Button, TextField, Typography, Paper, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/movie-explorer-logo.png';

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const success = location.state?.success;

  const handleLogin = () => {
    localStorage.setItem('loggedIn', 'true');
    setIsLoggedIn(true); // ✅ update state to trigger redirect
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #8B0000, #111)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        p: 2,
      }}
    >
      <img src={logo} alt="Movie Explorer" style={{ width: 200 }} />

      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 360, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} color="error.main">
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Login to continue
        </Typography>

        {success && (
          <Typography variant="body2" sx={{ color: 'green', mb: 1 }}>
            Account created successfully!
          </Typography>
        )}

        <TextField fullWidth label="Username" sx={{ mb: 2 }} />
        <TextField fullWidth label="Password" type="password" sx={{ mb: 3 }} />

        <Button fullWidth variant="contained" color="error" onClick={handleLogin}>
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don’t have an account?{' '}
          <Link
            onClick={() => navigate('/register')}
            sx={{ cursor: 'pointer', color: 'error.main', fontWeight: 600 }}
          >
            Register
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
