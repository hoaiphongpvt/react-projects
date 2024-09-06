const BASE_LINK = "https://image.tmdb.org/t/p/w500/";

export default function Movie({ movie, onSelectedId }) {
  return (
    <li onClick={() => onSelectedId(movie.id)}>
      <img
        src={`${BASE_LINK + movie.poster_path}`}
        alt={`${movie.original_title} poster`}
      />
      <h3>{movie.original_title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.release_date}</span>
        </p>
      </div>
    </li>
  );
}
