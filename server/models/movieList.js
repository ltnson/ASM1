const fs = require("fs");
const path = require("path");

const setPageSize = require("../utils/paging");

const Movies = {
  genreListData: () =>
    JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/genreList.json"), "utf8")
    ),
  mediaTypeListData: () =>
    JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "../data/mediaTypeList.json"),
        "utf8"
      )
    ),
  movieListData: () =>
    JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/movieList.json"), "utf8")
    ),
  videoListData: () =>
    JSON.parse(
      fs.readFileSync(path.join(__dirname, "../data/videoList.json"), "utf8")
    ),
};

function searchGenre(genre, data) {
  const genres = Movies.genreListData();
  let id = false;
  const newData = [];
  for (let i = 0; i < genres.length; i++) {
    if (genres[i].name.toLowerCase() === genre.toLowerCase()) {
      id = genres[i].id;
    }
  }
  if (id) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].genre_ids.includes(id)) newData.push(data[i]);
    }
  }
  return newData;
}

function searchLanguage(language, data) {
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].original_language === language) {
      newData.push(data[i]);
    }
  }
  return newData;
}

function searchYear(year, data) {
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    if (new Date(data[i].release_date).getFullYear() === parseInt(year)) {
      newData.push(data[i]);
    }
  }
  return newData;
}

function searchMediaType(mediaType, data) {
  const newData = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].media_type === mediaType) {
      newData.push(data[i]);
    }
  }
  return newData;
}

module.exports = class MovieList {
  static genreList() {
    return Movies.genreListData();
  }

  static movieTrending(pageNumb, cb) {
    const dataTrending = Movies.movieListData().sort(
      (top, bottom) => top.popularity - bottom.popularity
    );
    cb(setPageSize.paging(pageNumb, dataTrending));
  }

  static movieTopRate(pageNumb, cb) {
    const dataTopRate = Movies.movieListData().sort(
      (top, bottom) => top.vote_average - bottom.vote_average
    );
    cb(setPageSize.paging(pageNumb, dataTopRate));
  }

  static checkGenreId(genreParams) {
    const genre = Movies.genreListData();
    let genreName;
    let genreId = false;
    for (let i = 0; i < genre.length; i++) {
      if (genre[i].id === genreParams) {
        genreId = genreParams;
        genreName = genre[i].name;
      }
    }
    return { genreId: genreId, genreName: genreName };
  }

  static movieGenre(genreId, pageNumb, cb) {
    const data = Movies.movieListData();
    const dataGenre = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].genre_ids.includes(genreId)) {
        dataGenre.push(data[i]);
      }
    }
    cb(setPageSize.paging(pageNumb, dataGenre));
  }

  static postMovieTrailer(movieId, cb) {
    const dataTrailer = Movies.videoListData();
    let trailers = false;
    for (let i = 0; i < dataTrailer.length; i++) {
      if (dataTrailer[i].id === movieId) {
        trailers = dataTrailer[i].videos.filter(
          (video) =>
            (video.official === true &&
              video.site === "YouTube" &&
              video.type === "Trailer") ||
            (video.official === true &&
              video.site === "YouTube" &&
              video.type === "Teaser")
        );
        break;
      }
    }
    if (trailers) {
      cb(
        trailers.sort(
          (a, b) => new Date(b.published_at) - new Date(a.published_at)
        )[0]
      );
    } else {
      cb(false);
    }
  }

  static postMovieSearch(search, pageNumb, cb) {
    const data = Movies.movieListData();
    let dataSearch = [];
    if (
      search.genre.length < 1 &&
      search.language.length < 1 &&
      search.year.length < 1 &&
      search.mediaType === "all" &&
      search.keyWord.length < 1
    ) {
      cb(dataSearch);
      return;
    }
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].title &&
        data[i].title.toLowerCase().includes(search.keyWord.toLowerCase())
      ) {
        dataSearch.push(data[i]);
      } else if (
        data[i].overview &&
        data[i].overview.toLowerCase().includes(search.keyWord.toLowerCase())
      ) {
        dataSearch.push(data[i]);
      }
    }
    if (search.genre.length > 0) {
      dataSearch = searchGenre(search.genre, dataSearch);
    }
    if (search.language.length > 0) {
      dataSearch = searchLanguage(search.language, dataSearch);
    }
    if (search.year.length > 0) {
      dataSearch = searchYear(search.year, dataSearch);
    }
    if (search.mediaType !== "all" && search.mediaType !== "person") {
      dataSearch = searchMediaType(search.mediaType, dataSearch);
    }
    cb(setPageSize.paging(pageNumb, dataSearch));
  }
};
