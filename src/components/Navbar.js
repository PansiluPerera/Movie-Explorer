import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Box,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchBar from './SearchBar';
import SearchSuggestions from './SearchSuggestions';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../assets/movie-explorer-logo.png';

const Navbar = ({ mode, toggleMode, searchTerm, setSearchTerm, suggestions, setIsLoggedIn }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = window.innerWidth < 768;
  const outlineColor = theme.palette.mode === 'dark' ? 'black' : 'white';

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Trending', to: '/trending' },
    { label: 'Favorites', to: '/favorites' },
  ];

  const linkStyle = ({ isActive }) => ({
    color: 'white',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    borderBottom: isActive ? '2px solid #fff' : 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    transition: '0.3s',
  });

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          height: { xs: 'auto', md: 100 },
          justifyContent: 'center',
          boxShadow: 4,
          backgroundColor: 'rgba(211, 47, 47, 0.6)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          px: 2,
        }}
      >
        <Toolbar
          sx={{
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', md: 'space-between' },
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 1.5, md: 0 },
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <Box
                component="img"
                src={logo}
                alt="Movie Explorer"
                sx={{ height: 50, width: 'auto', cursor: 'pointer' }}
              />
            </NavLink>
          </Box>

          {/* Search Bar - Desktop Only */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: 450,
              flexGrow: 1,
              mx: 3,
              position: 'relative'
            }}
          >
            <Box sx={{ width: '100%' }}>
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 2,
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: outlineColor },
                    '&:hover fieldset': { borderColor: outlineColor },
                    '&.Mui-focused fieldset': { borderColor: outlineColor },
                  },
                }}
                withIcon
              />
              <Box sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', zIndex: 10 }}>
                <SearchSuggestions
                  suggestions={suggestions}
                  onSelect={(movie) => {
                    setSearchTerm('');
                    navigate(`/movie/${movie.id}`);
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Desktop Nav Links */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 2,
            }}
          >
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} style={linkStyle}>
                {link.label}
              </NavLink>
            ))}
            <Button
  startIcon={<LogoutIcon />}
  onClick={() => {
    localStorage.removeItem('loggedIn');     // ❌ clear localStorage
    setIsLoggedIn(false);                    // ✅ update login state
    navigate('/login');
  }}
  sx={{
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
  }}
>
  Sign Out
</Button>

          </Box>

          {/* Mobile Search and Burger */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 1,
              mt: 1,
            }}
          >
            <Box sx={{ flexGrow: 1, mr: 2 }}>
              <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: outlineColor },
                    '&:hover fieldset': { borderColor: outlineColor },
                    '&.Mui-focused fieldset': { borderColor: outlineColor },
                  },
                }}
                withIcon
              />
              <SearchSuggestions
                suggestions={suggestions}
                onSelect={(movie) => {
                  setSearchTerm('');
                  navigate(`/movie/${movie.id}`);
                }}
              />
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            backgroundColor: 'rgba(211, 47, 47, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: 'white' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((item) => (
              <ListItem
                button
                key={item.to}
                onClick={() => navigate(item.to)}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mb: 4, px: 2 }}>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.3)', mb: 2 }} />
          <Button
  fullWidth
  startIcon={<LogoutIcon />}
  onClick={() => {
    localStorage.removeItem('loggedIn');     // ❌ clear localStorage
    setIsLoggedIn(false);                    // ✅ update login state
    navigate('/login');
  }}
  sx={{
    color: 'white',
    textTransform: 'none',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
  }}
>
  Sign Out
</Button>


        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
