import React, { useEffect, useState } from "react";
import axios from "axios";

import MovieDetail from "../browse/MovieDetail";
import "./SearchResult.css";

const base_url = "https://image.tmdb.org/t/p/original";

const SearchResult = ({ movies, title }) => {
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

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
          console.log(error);
        });
      setSelectedMovie(movie);
    }
  };

  useEffect(() => {
    setSelectedMovie(null);
  }, [movies]);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters search-resul-container sc2">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster row_posterLarge`}
              src={`${base_url}${movie.poster_path}`}
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
};

export default SearchResult;
