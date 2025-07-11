import React from "react";
import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  return <div>MovieDetailPage {movieId}</div>;
};

export default MovieDetailPage;
