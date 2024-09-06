const BASE_LINK = "https://image.tmdb.org/t/p/w500/";

export default function WatchedMovie({ movie }) {
  return (
    <li key={movie.id}>
      <img
        src={`${BASE_LINK}${movie.poster_path}`}
        alt={`${movie.original_title} poster`}
      />
      <h3>{movie.original_title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.vote_average}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.vote_count}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
