const express = require("express");

const router = express.Router();

const movieController = require("../controllers/movie");

const authenticate = require("../middlewares/authMiddleware");

router.get("/api/movies/setGenres", movieController.genreList);

router.get(
  "/api/movies/trending/:pageN?",
  // authenticate.authenticateToken,
  movieController.getMovieTrending
);

router.get(
  "/api/movies/top-rate/:pageN?",
  // authenticate.authenticateToken,
  movieController.getMovieTopRate
);

router.get(
  "/api/movies/:genreId?/:pageN?",
  // authenticate.authenticateToken,
  movieController.getMovieGenre
);

router.post(
  "/api/movies/video",
  // authenticate.authenticateToken,
  movieController.postMovieTrailer
);

router.post(
  "/api/movies/search/:pageN?",
  // authenticate.authenticateToken,
  movieController.postMovieSearch
);

module.exports = router;
