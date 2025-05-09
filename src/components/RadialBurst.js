import React from 'react';
import { Box } from '@mui/material';

const RadialBurst = ({ trigger }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 24 + 28, // FAB center Y
        right: 24 + 28, // FAB center X
        width: 10,
        height: 10,
        borderRadius: '50%',
        transform: 'translate(50%, 50%) scale(0)',
        zIndex: 1999,
        pointerEvents: 'none',
        backgroundColor: 'rgba(211, 47, 47, 0.3)',
        animation: trigger ? 'burst 0.6s ease-out forwards' : 'none',
        '@keyframes burst': {
          to: {
            width: '300vmax',
            height: '300vmax',
            transform: 'translate(50%, 50%) scale(1)',
            opacity: 0,
          },
        },
      }}
    />
  );
};

export default RadialBurst;
