import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from './MovieCard';
import { Typography, Grid, Box } from '@mui/material';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 800,
          color: 'error.main',
          textTransform: 'uppercase',
          fontSize: { xs: '1.8rem', md: '2.5rem' },
          letterSpacing: 1.5,
          mb: 4,
        }}
      >
        My Favorite Movies
      </Typography>

      {favorites.length === 0 ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>
          You haven’t added any favorites yet.
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {favorites.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={3}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FavoritesPage;
