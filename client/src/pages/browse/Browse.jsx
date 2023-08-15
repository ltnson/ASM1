import React, { useEffect, useState } from "react";
import axios from "axios";

import MovieList from "../../components/browse/MovieList";
import Banner from "../../components/browse/Banner";
import Nav from "../../components/browse/Nav";

import "./Browse.css";

function Browse() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/movies/setGenres`)
      .then((response) => {
        setGenres(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="app">
      <Nav />
      <Banner />
      <MovieList isLargeRow fetchUrl="trending/2" />
      <MovieList fetchUrl="trending" />
      <MovieList fetchUrl="top-rate" />
      {genres.map((genre) => {
        return <MovieList key={genre.id} fetchUrl={genre.id} />;
      })}
    </div>
  );
}

export default Browse;
