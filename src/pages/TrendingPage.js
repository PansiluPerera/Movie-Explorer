import React, { useEffect, useState } from 'react';
import tmdb from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import {
  Grid,
  Button,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

const TrendingPage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadTrending = async () => {
    try {
      setLoading(true);
      const res = await tmdb.get('/trending/movie/week', {
        params: { page },
      });
      setMovies((prev) => [...prev, ...res.data.results]);
      setTotalPages(res.data.total_pages);
    } catch (error) {
      console.error('Failed to load trending movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrending();
  }, [page]);

  return (
    <Box sx={{ padding: '2rem', textAlign: 'center' }}>
      <Typography
  variant="h4"
  gutterBottom
  sx={{
    fontWeight: 800,
    color: 'error.main', // uses your red theme color
    textTransform: 'uppercase',
    fontSize: { xs: '1.8rem', md: '2.5rem' },
    letterSpacing: 1.5,
    mb: 4,
  }}
>
  Trending Movies
</Typography>
      <Grid container spacing={3} justifyContent="center">
        {movies.map((movie, index) => (
          <Grid item key={movie.id} xs={12} sm={6} md={3}>
            <Box sx={{ position: 'relative' }}>
              {/* Ranking number badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -10,
                  left: -10,
                  backgroundColor: 'error.main',
                  color: 'white',
                  borderRadius: '50%',
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  zIndex: 1,
                }}
              >
                {index + 1}
              </Box>
              <MovieCard movie={movie} />
            </Box>
          </Grid>
        ))}
      </Grid>

      {page < totalPages && (
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loading}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 8,
              textTransform: 'none',
              fontSize: '1rem',
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'error.dark',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default TrendingPage;
