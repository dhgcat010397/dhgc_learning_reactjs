import { API_BASE_URL, TMDB_API_OPTIONS, MAX_PAGES } from "../utils/constants";

export async function fetchMovies({ query = "", page = 1, signal }) {
  const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        query
      )}&page=${page}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

  const response = await fetch(endpoint, {
    ...TMDB_API_OPTIONS,
    signal: signal,
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
    ...TMDB_API_OPTIONS,
    signal: signal,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
