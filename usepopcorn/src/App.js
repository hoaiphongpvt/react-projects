import { useEffect, useState } from "react";

import WatchedSumary from "./components/WatchedSumary.js";
import WatchedMovieList from "./components/WatchMovieList.js";
import MovieList from "./components/MovieList.js";
import Box from "./components/Box.js";
import Search from "./components/Search.js";
import Main from "./components/Main.js";
import Navbar from "./components/Navbar.js";
import NumResult from "./components/NumResult.js";
import MovieDetails from "./components/MovieDetails.js";

const API_KEY = "34ebeebee5dd3b001abf3ba575de0218";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedValue = JSON.parse(localStorage.getItem("watched"));
    return storedValue ? storedValue : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  const handleSelectedId = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);

    localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  };

  async function handleSearch(query) {
    const controller = new AbortController();
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
        { signal: controller.signal }
      );

      if (!res.ok)
        throw new Error("Something went wrong with fetching movies.");
      const data = await res.json();

      if (data.success === false) throw new Error("Movies not found.");
      setMovies(data.results);
    } catch (err) {
      console.log(err.message);
      if (!err.name === "AbortError") setError(err.message);
    } finally {
      setIsLoading(false);
    }

    return function () {
      controller.abort();
    };
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(function () {
    setIsLoading(true);
    setError("");
    async function getPopularMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies.");

        const data = await res.json();

        if (data.success === false) throw new Error("Movies not found.");
        setMovies(data.results);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    getPopularMovies();
  }, []);

  return (
    <>
      <Navbar>
        <Search onSearch={handleSearch} />
        <NumResult movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedId={handleSelectedId} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSumary watched={watched} />{" "}
              <WatchedMovieList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>❌</span>
      {message}
    </p>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}
