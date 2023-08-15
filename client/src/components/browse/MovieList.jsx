import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieDetail from "../../components/browse/MovieDetail";
import "./MovieList.css";

const base_url = "https://image.tmdb.org/t/p/original";

function MovieList({ fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/movies/${fetchUrl}`)
      .then((response) => {
        setMovies(response.data.results);
        setTitle(response.data.genre_name);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          const message = error.response.data.message;
          alert(message);
        }
      });
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
      setTrailerUrl("");
    } else {
      axios
        .post("http://localhost:4000/api/movies/video", { movieId: movie.id })
        .then((response) => {
          setTrailerUrl(response.data.results.key);
        })
        .catch((error) => {
          if (error.response.status === 400) {
            const message = error.response.data.message;
            alert(message);
          } else if (error.response.status === 404) {
            const message = error.response.data.message;
            alert(message);
          }
        });
      setSelectedMovie(movie);
    }
  };

  const toGenreLink = `${fetchUrl}/1`;

  return (
    <div className="row">
      <a href={toGenreLink} className="movie-list-title">
        {isLargeRow ? "" : title}
      </a>
      <div className="row_posters sc2">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarge"}`}
              src={`${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      <div style={{ padding: "40px" }}>
        {selectedMovie && (
          <MovieDetail movieData={selectedMovie} movieTrailer={trailerUrl} />
        )}
      </div>
    </div>
  );
}

export default MovieList;
