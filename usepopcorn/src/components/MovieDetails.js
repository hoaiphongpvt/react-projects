import { useState, useEffect } from "react";

import StarRating from "./StarRating";
const BASE_LINK = "https://image.tmdb.org/t/p/w500/";
const API_KEY = "34ebeebee5dd3b001abf3ba575de0218";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatched,
}) {
  const [movie, setMovie] = useState({});

  useEffect(
    function () {
      async function getMovieData() {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${selectedId}?api_key=${API_KEY}`
          );
          const data = await res.json();
          setMovie(data);
        } catch (err) {
          console.log(err.message);
        }
      }
      getMovieData();
    },
    [selectedId]
  );

  const handleAdd = () => {
    const newWatchedMovie = movie;
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(function () {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }
    document.addEventListener("keydown", callback);

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, []);
  useEffect(
    function () {
      if (!movie.original_title) return;
      document.title = movie.original_title;

      return function () {
        document.title = "usepopcorn";
      };
    },
    [movie.original_title]
  );

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={`${BASE_LINK}${movie.poster_path}`} alt="Movie" />
        <div className="details-overview">
          <h2>{movie.original_title}</h2>
          <p>
            {movie.release_date} - {movie.runtime} min
          </p>
          <p>
            <span>⭐</span>
            {movie.vote_average} Rating
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          <StarRating
            maxRating={10}
            size={24}
            defaultRating={Math.round(movie.vote_average)}
          />
          <button className="btn-add" onClick={handleAdd}>
            + Add to list
          </button>
        </div>
        <em>{movie.overview}</em>
      </section>
    </div>
  );
}
