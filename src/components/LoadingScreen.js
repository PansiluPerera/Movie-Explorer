import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingScreen = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(255,255,255,0.8)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)',
    }}
  >
    <CircularProgress size={60} thickness={4} />
  </Box>
);

export default LoadingScreen;
