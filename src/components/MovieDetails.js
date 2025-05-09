import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import tmdb from '../api/tmdb';
import {
  Container,
  Typography,
  Grid,
  Chip,
  Box,
  Divider,
  Button,
  Tooltip,
  Fade,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme } from '@mui/material/styles';

import fallbackImage from '../assets/No-Image-Placeholder.png';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await tmdb.get(`/movie/${id}`, {
          params: {
            append_to_response: 'videos,credits',
          },
        });
        setMovie(res.data);

        const trailerVideo = res.data.videos.results.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setTrailer(trailerVideo?.key);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  const isDark = theme.palette.mode === 'dark';

  return (
    <Fade in timeout={600}>
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 80px)', // account for navbar if needed
            background: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            color: isDark ? 'white' : 'black',
        }}
        >
      <Container sx={{ flexGrow: 1, py: 6 }}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: 4,
            backgroundColor: isDark
              ? 'rgba(0, 0, 0, 0.6)'
              : 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'}`,
            color: 'inherit',
          }}
        >
            <Grid container spacing={4}>
              {/* Poster */}
              <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  component="img"
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : fallbackImage
                  }
                  alt={movie.title}
                  sx={{
                    width: '100%',
                    maxWidth: 300,
                    borderRadius: 3,
                    boxShadow: 5,
                  }}
                />
              </Grid>

              {/* Details */}
              <Grid item xs={12} md={8}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                  {movie.title}
                </Typography>

                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {movie.release_date} &bull; ⭐ {movie.vote_average} / 10
                </Typography>

                <Divider sx={{ marginY: 2 }} />

                <Typography variant="body1" paragraph>
                  {movie.overview}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Genres
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {movie.genres.map((genre) => (
                    <Tooltip title={`Genre: ${genre.name}`} key={genre.id}>
                      <Chip
                        label={genre.name}
                        color="error"
                        variant="outlined"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    </Tooltip>
                  ))}
                </Box>

                <Typography variant="h6" gutterBottom>
                  Top Cast
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {movie.credits.cast.slice(0, 6).map((actor) => (
                    <Tooltip title={`${actor.character}`} key={actor.id}>
                      <Chip label={actor.name} variant="outlined" />
                    </Tooltip>
                  ))}
                </Box>
              </Grid>
            </Grid>

            {/* Trailer */}
            {trailer && (
              <Box mt={6}>
                <Typography variant="h5" gutterBottom>
                  Official Trailer
                </Typography>
                <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer}`}
                    title="YouTube trailer"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                      borderRadius: '8px',
                    }}
                    allowFullScreen
                  />
                </Box>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </Fade>
  );
};

export default MovieDetails;
