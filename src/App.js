import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import HomePage from './pages/HomePage';
import TrendingPage from './pages/TrendingPage';
import FavoritesPage from './components/FavoritesPage';
import MovieDetails from './components/MovieDetails';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';

import PrivateRoute from './components/PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { searchMovies } from './api/movieService';

import ScrollToTop from './components/ScrollToTop';


function App({ mode, setMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchPage, setSearchPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });

  const location = useLocation();
  const currentPath = location.pathname;
  const excludeLayoutRoutes = ['/login', '/register'];

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleMovieSelect = () => {
    setSearchTerm('');
    setSearchResults([]);
    setSearchPage(1);
  };

  // Search results fetch
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim()) {
        const results = await searchMovies(searchTerm, searchPage);
        setSearchResults(results.results);
        setTotalPages(results.total_pages);
      } else {
        setSearchResults([]);
        setTotalPages(1);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, searchPage]);

  // Search suggestions
  useEffect(() => {
    const shortDelay = setTimeout(async () => {
      if (searchTerm.trim().length > 1) {
        const result = await searchMovies(searchTerm, 1);
        setSuggestions(result.results.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(shortDelay);
  }, [searchTerm]);

  // Route loading animation
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  const isSearching = searchTerm.trim().length > 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop /> {/* <-- insert this here */}
      {isLoading && <LoadingScreen />}

      {!excludeLayoutRoutes.includes(currentPath) && (
        <Navbar
          mode={mode}
          toggleMode={toggleMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          suggestions={suggestions}
          onSelectSuggestion={(movie) => {
            handleMovieSelect();
            window.location.href = `/movie/${movie.id}`;
          }}
          setIsLoggedIn={setIsLoggedIn} // passed down to handle logout
        />
      )}

      <Box sx={{ flexGrow: 1 }}>
        {isSearching ? (
          <Container maxWidth="md" sx={{ paddingTop: 3 }}>
            <SearchResults
              movies={searchResults}
              onMovieSelect={handleMovieSelect}
              showNoResults={searchResults.length === 0}
              page={searchPage}
              totalPages={totalPages}
              onPageChange={setSearchPage}
            />
          </Container>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <HomePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/trending"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <TrendingPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/favorites"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <MovieDetails />
                </PrivateRoute>
              }
            />
          </Routes>
        )}
      </Box>

      {!excludeLayoutRoutes.includes(currentPath) && <Footer />}
    </Box>
  );
}

export default App;
