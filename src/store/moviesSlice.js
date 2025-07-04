import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    isLoading: false,
    page: 1,
    totalPages: 0,
    searchQuery: "",
    errorMessage: "",
  },
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setMovies,
  setIsLoading,
  setPage,
  setTotalPages,
  setSearchQuery,
  setErrorMessage,
} = moviesSlice.actions;

export default moviesSlice.reducer;
