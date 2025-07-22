import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import { default as api } from "./services/apis/moviesApi";
import { MAX_PAGES } from "./utils/constants";

const App = () => {
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
      api.fetchMovies({ query: debouncedQuery, page, signal }),
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
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="cinema-banner.jpg" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </header>

        <section className="all-movies">
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
      </div>
    </main>
  );
};

export default App;
