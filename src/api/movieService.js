import tmdb from './tmdb';

export const getTrendingMovies = async () => {
  try {
    const response = await tmdb.get('/trending/movie/week');
    return response.data.results;
  } catch (error) {
    console.error('Failed to fetch trending movies:', error);
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const res = await tmdb.get('/search/movie', {
      params: { query, page }
    });
    return res.data;
  } catch (error) {
    console.error('Movie search failed:', error);
    return { results: [], total_pages: 0 };
  }
};
