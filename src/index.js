import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Fab } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

import { FavoritesProvider } from './context/FavoritesContext';
import { getTheme } from './theme/theme';
import App from './App';
import ThemeTransitionWrapper from './components/ThemeTransitionWrapper';
import RadialBurst from './components/RadialBurst';

const RootApp = () => {
  const [mode, setMode] = useState('light');
  const [burst, setBurst] = useState(false);
  const theme = getTheme(mode);

  const toggleMode = () => {
    setBurst(true); // Trigger radial burst animation

    setTimeout(() => {
      setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      setBurst(false); // Reset after animation
    }, 400); // Match RadialBurst timing
  };

  return (
    <BrowserRouter>
      <FavoritesProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ThemeTransitionWrapper>
            <App mode={mode} setMode={setMode} />
          </ThemeTransitionWrapper>

          {/* Radial animation */}
          <RadialBurst trigger={burst} />

          {/* Floating theme toggle */}
          <Fab
            onClick={toggleMode}
            color="primary"
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'error.dark',
              },
              zIndex: 2000,
            }}
          >
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </Fab>
        </ThemeProvider>
      </FavoritesProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootApp />);
