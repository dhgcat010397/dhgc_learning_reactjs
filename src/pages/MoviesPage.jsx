import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import { fetchMoviesApi, MAX_PAGES } from "./services/apis/moviesApi";

const MoviesPage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastTotalPages, setLastTotalPages] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce the search query to avoid too many API calls
  useDebounce(
    () => {
      setDebouncedQuery(searchQuery);
      setPage(1); // Reset to first page when search changes
    },
    500,
    [searchQuery]
  );

  useEffect(() => {
    setLastTotalPages(null);
  }, [debouncedQuery]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movies", debouncedQuery, page],
    queryFn: ({ signal }) =>
      fetchMoviesApi({ query: debouncedQuery, page, signal }),
    keepPreviousData: true,
    onSuccess: (data) => {
      const safePages =
        data?.total_pages <= MAX_PAGES ? data.total_pages : MAX_PAGES || 0;
      setLastTotalPages(safePages);
    },
  });

  const movies = data?.results || [];
  const totalPages =
    (data?.total_pages && data.total_pages <= MAX_PAGES
      ? data.total_pages
      : lastTotalPages) ?? 1;

  return (
    <section className="all-movies">
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <h2 className="mt-[40px]">All Movies</h2>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <p className="text-red-500">{error.message}</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}

      <Pagination
        count={totalPages}
        page={page}
        showFirstButton
        showLastButton
        onChange={(event, value) => setPage(value)}
      />
    </section>
  );
};

export default MoviesPage;
