import React from 'react';
import { List, ListItem, ListItemText, Paper } from '@mui/material';

const SearchSuggestions = ({ suggestions, onSelect }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <Paper
      sx={{
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        zIndex: 10,
        maxHeight: 300,
        overflowY: 'auto',
      }}
    >
      <List dense>
        {suggestions.map((movie) => (
          <ListItem
            button
            key={movie.id}
            onClick={() => onSelect(movie)}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(211, 47, 47, 0.1)',
              },
            }}
          >
            <ListItemText primary={movie.title} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default SearchSuggestions;
