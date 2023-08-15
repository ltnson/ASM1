import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import SearchResult from "../../components/search/SearchResult";
import Nav from "../../components/browse/Nav";
import SelectPage from "../../components/search/SelectPage";

function Genre() {
  const { genreId, pageN } = useParams();
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(parseInt(pageN));
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/movies/${genreId}/${pageNumber}`)
      .then((response) => {
        setMovies(response.data.results);
        setTitle(response.data.genre_name);
        setTotalPage(response.data.total_page);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          const message = error.response.data.message;
          alert(message);
        }
      });
  }, [pageNumber]);

  const handleSetPage = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <div style={{ paddingTop: "80px" }}>
      <Nav />
      <SearchResult movies={movies} title={title} />
      <SelectPage
        pageN={pageNumber}
        totalPage={totalPage}
        onChange={handleSetPage}
      />
    </div>
  );
}

export default Genre;
