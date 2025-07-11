const API_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${TMDB_API_KEY}` },
};
export const MAX_PAGES = 500;

export async function fetchMovies({ query = "", page = 1, signal }) {
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&page=${page}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

  const response = await fetch(endpoint, {
    ...API_OPTIONS,
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  data.total_pages = Math.min(data.total_pages || 0, MAX_PAGES);

  return data;
}

export async function getMovieById({ id, signal }) {
  const endpoint = `${API_BASE_URL}/movie/${id}`;

  const response = await fetch(endpoint, {
    ...API_OPTIONS,
    signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
