const express = require("express");
const Movie = require("../models/Movie");
const auth = require("../middleware/auth");

const router = express.Router();

// 🔒 Protect all routes
router.use(auth);

// Add or update movie rating (user-specific)
router.post("/add", async (req, res) => {
  const { movieId, title, poster, rating } = req.body;
  const userId = req.user.id;

  let movie = await Movie.findOne({ movieId, userId });

  if (movie) {
    movie.ratingTotal += rating;
    movie.ratingCount += 1;
    movie.averageRating = movie.ratingTotal / movie.ratingCount;
    await movie.save();
  } else {
    movie = new Movie({
      userId,
      movieId,
      title,
      poster,
      ratingTotal: rating,
      ratingCount: 1,
      averageRating: rating
    });
    await movie.save();
  }

  res.json(movie);
});

// Get all watched movies for the logged-in user
router.get("/", async (req, res) => {
  const userId = req.user.id;
  const movies = await Movie.find({ userId });
  res.json(movies);
});

// Remove movie from watchlist
router.delete("/:id", async (req, res) => {
  const userId = req.user.id;
  const movie = await Movie.findOneAndDelete({ _id: req.params.id, userId });

  if (!movie) return res.status(404).json({ msg: "Movie not found" });

  res.json({ msg: "Movie removed", movie });
});

module.exports = router;
