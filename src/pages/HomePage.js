
import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  CircularProgress,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Paper
} from '@mui/material';
import MovieCard from '../components/MovieCard';
import tmdb from '../api/tmdb';
import LoadingScreen from '../components/LoadingScreen';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '' });
  const [filterMode, setFilterMode] = useState(false);
  const [filterPage, setFilterPage] = useState(1);

  const genresList = [
    { id: 28, name: 'Action' },
    { id: 35, name: 'Comedy' },
    { id: 18, name: 'Drama' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
  ];

  const years = Array.from({ length: 25 }, (_, i) => 2025 - i);
  const ratings = ['9', '8', '7', '6', '5'];

  const fetchPopularMovies = async (targetPage = 1) => {
    setLoading(true);
    try {
      const res = await tmdb.get('/movie/popular', { params: { page: targetPage } });
      setMovies(prev => [...prev, ...res.data.results]);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error('Popular movie load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredMovies = async (targetPage = 1, reset = false) => {
    setLoading(true);
    try {
      const params = {
        page: targetPage,
        sort_by: 'popularity.desc',
        with_genres: filters.genre || undefined,
        primary_release_year: filters.year || undefined,
        'vote_average.gte': filters.rating || undefined,
      };

      const res = await tmdb.get('/discover/movie', { params });
      if (reset) {
        setMovies(res.data.results);
      } else {
        setMovies(prev => [...prev, ...res.data.results]);
      }
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error('Filtered movie load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!filterMode) fetchPopularMovies(page);
  }, [page]);

  const handleApplyFilters = () => {
    setFilterMode(true);
    setPage(1);
    setFilterPage(1);
    fetchFilteredMovies(1, true);
  };

  const handleLoadMore = () => {
    if (filterMode) {
      const next = filterPage + 1;
      setFilterPage(next);
      fetchFilteredMovies(next);
    } else {
      setPage(prev => prev + 1);
    }
  };

  return (
    <Box sx={{ padding: '2rem', textAlign: 'center', minHeight: '100vh' }}>
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
        Popular Movies
      </Typography>

      {/* Filter Box */}
      <Paper sx={{ p: 2, mb: 4, display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center', border: '2px solid red' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={filters.genre}
            label="Genre"
            onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
          >
            <MenuItem value="">All</MenuItem>
            {genresList.map((g) => (
              <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={filters.year}
            label="Year"
            onChange={(e) => setFilters(prev => ({ ...prev, year: e.target.value }))}
          >
            <MenuItem value="">All</MenuItem>
            {years.map((y) => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Rating</InputLabel>
          <Select
            value={filters.rating}
            label="Rating"
            onChange={(e) => setFilters(prev => ({ ...prev, rating: e.target.value }))}
          >
            <MenuItem value="">All</MenuItem>
            {ratings.map((r) => (
              <MenuItem key={r} value={r}>{r}+</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant="contained" color="error" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </Paper>

      {/* Movies */}
      <Grid container spacing={3} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={3}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>

      {/* Load More */}
      {(filterMode && filterPage < totalPages) || (!filterMode && page < totalPages) ? (
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
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
      ) : null}
    </Box>
  );
};

export default HomePage;
