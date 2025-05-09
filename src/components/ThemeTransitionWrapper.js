import React from 'react';
import { Box, useTheme } from '@mui/material';

const ThemeTransitionWrapper = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        transition: 'all 0.6s ease-in-out',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        minHeight: '100vh',
        transform: 'scale(1)',
        willChange: 'background-color, color',
      }}
    >
      {children}
    </Box>
  );
};

export default ThemeTransitionWrapper;
