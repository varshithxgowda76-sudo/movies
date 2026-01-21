import { useEffect, useState } from "react";
import axios from "axios";
import { TMDB_API_KEY } from "../api";
import MovieCard from "./MovieCard";

function PopularMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const fetchPopularMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      setMovies(res.data.results.slice(0, 8)); // 🔥 top 8 movies
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>🔥 Most Popular Movies</h2>
      <div className="popular-slider">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default PopularMovies;
