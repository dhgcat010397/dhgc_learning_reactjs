export const API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const TMDB_API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_KEY}`,
  },
};
export const API_OPTIONS = {
  headers: {
    "Content-Type": "application/json",
  },
};
export const MAX_PAGES = 500;
