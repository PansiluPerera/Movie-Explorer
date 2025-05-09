import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ value, onChange, sx, withIcon = false }) => {
  const handleClear = () => {
    onChange({ target: { value: '' } });
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      placeholder="Search movies..."
      sx={{
        ...sx,
        '& .MuiOutlinedInput-root': {
          color: '#b71c1c',

          '& input::placeholder': {
            color: '#b71c1c',
            opacity: 1
          },
        },
      }}
      InputProps={{
        sx: { borderRadius: 2 },
        startAdornment: withIcon ? (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: '#b71c1c' }} />
          </InputAdornment>
        ) : null,
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} size="small">
              <ClearIcon sx={{ color: '#b71c1c' }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
