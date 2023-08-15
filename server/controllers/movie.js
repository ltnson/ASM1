const Movies = require("../models/movieList");

exports.genreList = (req, res, next) => {
  const results = Movies.genreList();
  res.send({ results: results });
};

exports.getMovieTrending = (req, res, next) => {
  const pageNumb = parseInt(req.params.pageN) || 1;
  Movies.movieTrending(pageNumb, (data) => {
    res.send({
      results: data.dataPage,
      page: pageNumb,
      total_page: data.totalPage,
      genre_name: "Trending",
    });
  });
};

exports.getMovieTopRate = (req, res, next) => {
  const pageNumb = parseInt(req.params.pageN) || 1;
  Movies.movieTopRate(pageNumb, (data) => {
    res.send({
      results: data.dataPage,
      page: pageNumb,
      total_page: data.totalPage,
      genre_name: "Top Rate",
    });
  });
};

exports.getMovieGenre = (req, res, next) => {
  const pageNumb = parseInt(req.params.pageN) || 1;
  const genreId = parseInt(req.params.genreId);
  if (!genreId) {
    res.status(400).send({ message: "Not found gerne parram" });
  } else {
    const genre = Movies.checkGenreId(genreId);
    if (genre.genreId) {
      Movies.movieGenre(genre.genreId, pageNumb, (data) => {
        res.send({
          results: data.dataPage,
          page: pageNumb,
          total_page: data.totalPage,
          genre_name: genre.genreName,
        });
      });
    } else {
      res.status(400).send({ message: "Not found that gerne id" });
    }
  }
};

exports.postMovieTrailer = (req, res, next) => {
  const movieId = parseInt(req.body.movieId);
  if (!movieId) {
    res.status(400).send({ message: "Not found film_id parram" });
  } else {
    Movies.postMovieTrailer(movieId, (data) => {
      if (data) {
        return res.send({ results: data });
      } else if (!data.type) {
        res.status(404).send({ message: "Not found video" });
      }
    });
  }
};

exports.postMovieSearch = (req, res, next) => {
  const pageNumb = parseInt(req.params.pageN) || 1;
  const search = req.body.data;
  Movies.postMovieSearch(search, pageNumb, (data) => {
    if (data.length === 0) {
      res.status(400).send({ message: "Not found keyword parram" });
    } else {
      res.send({
        results: data.dataPage,
        page: pageNumb,
        total_page: data.totalPage,
      });
    }
  });
};
