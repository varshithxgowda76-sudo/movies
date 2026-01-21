const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // 🔥 Add user reference
  movieId: { type: Number },
  title: String,
  poster: String,
  ratingTotal: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Movie", MovieSchema);
