import React, { useState, useReducer, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Nav from "../../components/browse/Nav";
import SearchResult from "../../components/search/SearchResult";
import SelectPage from "../../components/search/SelectPage";
import "./Search.css";

const initialState = {
  keyWord: "",
  genre: "",
  language: "",
  year: "",
  mediaType: "all",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_KEY_WORD":
      return { ...state, keyWord: action.payload };
    case "SET_GENRE":
      return { ...state, genre: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "SET_YEAR":
      return { ...state, year: action.payload };
    case "SET_MEDIA_TYPE":
      return { ...state, mediaType: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const Search = () => {
  const { pageN } = useParams();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [totalPage, setTotalPage] = useState(0);
  const [pageNumber, setPageNumber] = useState(parseInt(pageN));
  const [movies, setMovies] = useState([]);

  const getAPISearch = () => {
    axios
      .post(`http://localhost:4000/api/movies/search/${pageNumber}`, {
        data: state,
      })
      .then((response) => {
        setMovies(response.data.results);
        setTotalPage(response.data.total_page);
        setPageNumber(response.data.page);
        navigate(`/search/${pageNumber}`);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          const message = error.response.data.message;
          alert(message);
        }
      });
  };

  const handleSearch = () => {
    getAPISearch();
  };

  const resetSearch = () => {
    dispatch({ type: "RESET" });
  };

  const handleSetPage = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  useEffect(() => {
    if (pageNumber > 0) {
      getAPISearch();
    }
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(0);
  }, [state]);

  return (
    <div className="app">
      <Nav />
      <div className="s009">
        <form>
          <div className="inner-form">
            <div className="basic-search">
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Type Keywords"
                  onChange={(event) =>
                    dispatch({
                      type: "SET_KEY_WORD",
                      payload: event.target.value,
                    })
                  }
                  value={state.keyWord}
                />
                <div className="icon-wrap">
                  <svg
                    className="svg-inline--fa fa-search fa-w-16"
                    fill="#ccc"
                    aria-hidden="true"
                    data-prefix="fas"
                    data-icon="search"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="select-form">
              <input
                type="text"
                id="genre"
                placeholder="Genre"
                value={state.genre}
                onChange={(event) =>
                  dispatch({ type: "SET_GENRE", payload: event.target.value })
                }
              />

              <input
                type="text"
                id="language"
                value={state.language}
                placeholder="Language"
                onChange={(event) =>
                  dispatch({
                    type: "SET_LANGUAGE",
                    payload: event.target.value,
                  })
                }
              />

              <input
                type="text"
                id="year"
                value={state.year}
                placeholder="Year"
                onChange={(event) =>
                  dispatch({ type: "SET_YEAR", payload: event.target.value })
                }
              />

              <select
                id="mediaType"
                value={state.mediaType}
                onChange={(event) =>
                  dispatch({
                    type: "SET_MEDIA_TYPE",
                    payload: event.target.value,
                  })
                }
              >
                <option value="all">Tất cả</option>
                <option value="movie">Phim</option>
                <option value="tv">TV Show</option>
                <option value="person">Người nổi tiếng</option>
              </select>
            </div>
            <div className="advance-search">
              <div className="row third">
                <div className="input-field">
                  <div className="result-count"></div>
                  <div className="group-btn">
                    <button
                      className="btn-delete"
                      onClick={resetSearch}
                      type="button"
                    >
                      RESET
                    </button>
                    <button
                      className="btn-search"
                      type="button"
                      onClick={handleSearch}
                    >
                      SEARCH
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <SearchResult movies={movies} title="Search Result" />
      {movies.length > 0 && (
        <SelectPage
          pageN={pageNumber}
          totalPage={totalPage}
          onChange={handleSetPage}
        />
      )}
    </div>
  );
};

export default Search;
