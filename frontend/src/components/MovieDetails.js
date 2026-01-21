import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API, TMDB_API_KEY } from "../api";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`
    );
    setMovie(res.data);
  };

  const addToWatchlist = async () => {
    await API.post("/movies/add", {
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster_path,
      rating: Number(rating),
    });

    window.location.href = "/";
  };

  if (!movie) return null;

  return (
    <div
      className="movie-details"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="movie-overlay">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>

        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="1">⭐ 1</option>
          <option value="2">⭐ 2</option>
          <option value="3">⭐ 3</option>
          <option value="4">⭐ 4</option>
          <option value="5">⭐ 5</option>
        </select>

        <button onClick={addToWatchlist}>Add to Watchlist</button>
      </div>
    </div>
  );
}

export default MovieDetails;
