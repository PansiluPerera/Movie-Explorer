import React, { useEffect, useState } from 'react';
import { getTrendingMovies } from '../api/movieService';
import MovieCard from './MovieCard';
import { Typography, Grid } from '@mui/material';

const TrendingSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const trending = await getTrendingMovies();
      setMovies(trending);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Trending Movies
      </Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default TrendingSection;
