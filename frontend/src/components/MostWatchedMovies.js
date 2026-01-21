import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { TMDB_API_KEY } from "../api";

function MostWatchedMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMostWatched();
  }, []);

  const fetchMostWatched = async () => {
    try {
      // We'll use TMDB "trending" as proxy for most watched
      const res = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
      );
      setMovies(res.data.results.slice(0, 8)); // 🔥 top 8
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>🔥 Most Watched Movies</h2>
      <div className="most-watched-slider">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MostWatchedMovies;
