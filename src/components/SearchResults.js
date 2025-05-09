import React from 'react';
import { Grid, Typography, Box, Pagination } from '@mui/material';
import MovieCard from './MovieCard';

const SearchResults = ({
  movies,
  onMovieSelect,
  showNoResults,
  page,
  totalPages,
  onPageChange
}) => {
  return (
    <div>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center', color: 'error.main' }}>
        Search Results
      </Typography>

      {showNoResults ? (
        <Typography variant="body1" color="text.secondary" textAlign="center">
          No results found.
        </Typography>
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {movies.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={3}>
                <MovieCard movie={movie} onClick={onMovieSelect} />
                </Grid>
            ))}
            </Grid>

          {totalPages > 1 && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => onPageChange(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;