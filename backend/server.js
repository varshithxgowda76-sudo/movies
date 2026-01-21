const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const movieRoutes = require("./routes/movieRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "*"
}));
app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose.connect("mongodb+srv://gowdaamruth4_db_user:Amruth_7204153878@movie.tjqtbxs.mongodb.net/movie-app")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/movies", movieRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
