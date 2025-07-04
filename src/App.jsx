// import React from "react";
// import { useRef, useCallback, useEffect, useState } from "react";
// import { useDebounce } from "react-use";
// import SearchBar from "./components/SearchBar";
// import Spinner from "./components/Spinner";
// import MovieCard from "./components/MovieCard";
// import Pagination from "./components/Pagination";

// const API_BASE_URL = "https://api.themoviedb.org/3";
// const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
// const API_OPTIONS = {
//   method: "GET",
//   headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
// };
// const MAX_PAGES = 500; // TMDB limits to 500 pages

// const App = () => {
//   const [movies, setMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

//   const abortControllerRef = useRef(null);

//   // Debounce the search query to avoid too many API calls
//   useDebounce(
//     () => {
//       setDebouncedQuery(searchQuery);
//     },
//     500,
//     [searchQuery]
//   );

//   const fetchMovies = useCallback(
//     async (query = "") => {
//       // Abort previous request if any
//       abortControllerRef.current?.abort();
//       // Create a new controller for this request
//       const controller = new AbortController();
//       abortControllerRef.current = controller;

//       setIsLoading(true);
//       setErrorMessage("");

//       try {
//         const endpoint = query
//           ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
//               query
//             )}&page=${page}`
//           : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

//         const response = await fetch(endpoint, {
//           ...API_OPTIONS,
//           signal: controller.signal,
//         });
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data);

//         if (data.Response === "False") {
//           setErrorMessage(data.error || "Failed to fetch movies");
//           setMovies([]);
//           setTotalPages(0);
//           return;
//         }

//         setMovies(data.results || []);
//         setTotalPages(
//           (data.total_pages <= MAX_PAGES ? data.total_pages : MAX_PAGES) || 0
//         );
//       } catch (error) {
//         if (error.name === "AbortError") {
//           console.log("Aborted");
//           return;
//         }

//         setErrorMessage("Error fetching movies. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     },
//     [page, abortControllerRef]
//   );

//   useEffect(() => {
//     fetchMovies(debouncedQuery);
//   }, [debouncedQuery, fetchMovies]);

//   return (
//     <main>
//       <div className="pattern" />
//       <div className="wrapper">
//         <header>
//           <img src="cinema-banner.jpg" alt="Hero Banner" />
//           <h1>
//             Find <span className="text-gradient">Movies</span> You'll Enjoy
//             Without the Hassle
//           </h1>

//           <SearchBar
//             searchQuery={searchQuery}
//             setSearchQuery={setSearchQuery}
//           />
//         </header>

//         <section className="all-movies">
//           <h2 className="mt-[40px]">All Movies</h2>

//           {isLoading ? (
//             <Spinner />
//           ) : errorMessage ? (
//             <p className="text-red-500">{errorMessage}</p>
//           ) : (
//             <ul>
//               {movies.map((movie) => (
//                 <MovieCard key={movie.id} movie={movie} />
//               ))}
//             </ul>
//           )}

//           <Pagination
//             count={totalPages}
//             page={page}
//             showFirstButton
//             showLastButton
//             onChange={(event, value) => setPage(value)}
//           />
//         </section>
//       </div>
//     </main>
//   );
// };

// export default App;

import React, { useRef, useCallback, useEffect } from "react";
import { useDebounce } from "react-use";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./components/SearchBar";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import {
  setMovies,
  setIsLoading,
  setPage,
  setTotalPages,
  setSearchQuery,
  setErrorMessage,
} from "./store/moviesSlice";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
};
const MAX_PAGES = 500; // TMDB limits to 500 pages

const App = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const isLoading = useSelector((state) => state.movies.isLoading);
  const page = useSelector((state) => state.movies.page);
  const totalPages = useSelector((state) => state.movies.totalPages);
  const searchQuery = useSelector((state) => state.movies.searchQuery);
  const errorMessage = useSelector((state) => state.movies.errorMessage);

  const [debouncedQuery, setDebouncedQuery] = React.useState(searchQuery);
  const abortControllerRef = useRef(null);

  // Debounce the search query to avoid too many API calls
  useDebounce(
    () => {
      setDebouncedQuery(searchQuery);
    },
    500,
    [searchQuery]
  );

  const fetchMovies = useCallback(
    async (query = "") => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      dispatch(setIsLoading(true));
      dispatch(setErrorMessage(""));

      try {
        const endpoint = query
          ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
              query
            )}&page=${page}`
          : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&page=${page}`;

        const response = await fetch(endpoint, {
          ...API_OPTIONS,
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.Response === "False") {
          dispatch(setErrorMessage(data.error || "Failed to fetch movies"));
          dispatch(setMovies([]));
          dispatch(setTotalPages(0));
          return;
        }

        dispatch(setMovies(data.results || []));
        dispatch(
          setTotalPages(
            (data.total_pages <= MAX_PAGES ? data.total_pages : MAX_PAGES) || 0
          )
        );
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
        dispatch(
          setErrorMessage("Error fetching movies. Please try again later.")
        );
      } finally {
        dispatch(setIsLoading(false));
      }
    },
    [page, dispatch]
  );

  useEffect(() => {
    fetchMovies(debouncedQuery);
  }, [debouncedQuery, fetchMovies]);

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
            setSearchQuery={(q) => dispatch(setSearchQuery(q))}
          />
        </header>

        <section className="all-movies">
          <h2 className="mt-[40px]">All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
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
            onChange={(event, value) => dispatch(setPage(value))}
          />
        </section>
      </div>
    </main>
  );
};

export default App;
