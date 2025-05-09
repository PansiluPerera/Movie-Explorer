import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/movie-explorer-logo.png';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', username: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!form.name || !form.username || !form.password || !form.confirm) {
      setError('Please fill in all fields');
      return;
    }

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    navigate('/login', { state: { success: true } });
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
        p: 2
      }}
    >
      <img src={logo} alt="Movie Explorer" style={{ width: 200 }} />
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700} color="error.main">Create Account</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>Sign up to get started</Typography>

        {error && (
          <Typography variant="body2" sx={{ color: 'red', mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField fullWidth label="Full Name" sx={{ mb: 2 }} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <TextField fullWidth label="Username" sx={{ mb: 2 }} onChange={(e) => setForm({ ...form, username: e.target.value })} />
        <TextField fullWidth label="Password" type="password" sx={{ mb: 2 }} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <TextField fullWidth label="Confirm Password" type="password" sx={{ mb: 3 }} onChange={(e) => setForm({ ...form, confirm: e.target.value })} />

        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link onClick={() => navigate('/login')} sx={{ cursor: 'pointer', color: 'error.main', fontWeight: 600 }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
