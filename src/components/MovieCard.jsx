import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  movie: {
    id,
    title,
    vote_average,
    poster_path,
    release_date,
    original_language,
  },
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="movie-card flex flex-col cursor-pointer"
      onClick={() => navigate(`/movies/${id}`)}
    >
      {/* 
      h-[300px]: set your desired height
      w-auto: maintain aspect ratio
      object-contain: show full image, even if smaller
      display: block: ensures the image is displayed as a block element
      */}
      <img
        className="movie-poster h-[300px] w-auto object-contain block"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : "/no-movie.svg"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src="rating-48.png" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
