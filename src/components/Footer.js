import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import logo from '../assets/movie-explorer-logo.png';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        mt: 6,
        py: 3, // increased from 2 to 3 for better spacing
        backgroundColor: 'rgba(211, 47, 47, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        color: 'white',
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <img
          src={logo}
          alt="Movie Explorer"
          style={{ height: 50 }}
        />
      </Box>

      {/* Designer credit */}
      <Typography variant="body2" sx={{ fontSize: '0.95rem', mb: 0.5 }}>
        Designed by <strong>Pansilu Perera</strong>
      </Typography>

      {/* Copyright */}
      <Typography variant="caption" sx={{ fontSize: '0.8rem' }} display="block">
        &copy; {new Date().getFullYear()} All rights reserved.
      </Typography>

      {/* Scroll to top button */}
      <IconButton
        onClick={scrollToTop}
        color="inherit"
        sx={{ mt: 1 }}
        size="medium"
        aria-label="Scroll to top"
      >
        <ArrowUpwardIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default Footer;
