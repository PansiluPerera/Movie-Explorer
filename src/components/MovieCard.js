import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  IconButton,
  Box,
  Stack,
  useTheme,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import fallbackImage from '../assets/No-Image-Placeholder.png';

const MovieCard = ({ movie, onClick }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(movie.id);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    isFav ? removeFavorite(movie.id) : addFavorite(movie);
  };

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <Card
      sx={{
        width: 220,
        height: 470,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(255,255,255,0.95)' : undefined,
        boxShadow: theme.palette.mode === 'light' ? 3 : undefined,
        borderRadius: 2,
        '&:hover .fav-btn': {
          opacity: 1,
        },
      }}
    >
      <CardActionArea
        onClick={() => {
          if (onClick) onClick();
          navigate(`/movie/${movie.id}`);
        }}
      >
        {/* Poster Image with hover favorite button */}
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                : fallbackImage
            }
            alt={movie.title}
          />
          <IconButton
  className="fav-btn"
  onClick={handleToggleFavorite}
  sx={{
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    opacity: {
      xs: 1,       // Always visible on small screens (mobile)
      md: 0        // Hidden on desktop until hover
    },
    transition: 'opacity 0.3s',
    zIndex: 1,
  }}
>
  {isFav ? <Favorite color="error" /> : <FavoriteBorder />}
</IconButton>
        </Box>

        {/* Movie Info */}
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            noWrap
            title={movie.title}
          >
            {movie.title}
          </Typography>

          {releaseYear && (
            <Typography variant="body2" color="text.secondary">
              {releaseYear}
            </Typography>
          )}

          <Stack direction="row" justifyContent="center" alignItems="center" mt={1}>
            <Typography variant="body2" color="text.secondary">
              ⭐ {rating}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
