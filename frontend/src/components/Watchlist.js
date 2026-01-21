import { useEffect, useState } from "react";
import { API } from "../api";

function Watchlist() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    const res = await API.get("/movies");
    setMovies(res.data);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const removeMovie = async (id) => {
    await API.delete(`/movies/${id}`);
    setMovies(movies.filter(m => m._id !== id)); // update UI
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>🎯 Your Watchlist</h2>

      <div className="watched-slider">
        {movies.map(movie => (
          <div className="card" key={movie._id}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>⭐ {movie.averageRating.toFixed(1)}</p>
            <button 
              style={{ marginTop: "8px", background: "#e50914", color: "#fff", border: "none", padding: "5px 10px", cursor: "pointer" }}
              onClick={() => removeMovie(movie._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;
