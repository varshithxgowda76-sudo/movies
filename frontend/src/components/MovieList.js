import { useState } from "react";
import axios from "axios";
import MovieSlider from "./MovieSlider";
import Watchlist from "./Watchlist";
import MovieCard from "./MovieCard";
import { TMDB_API_KEY } from "../api";
import PopularMovies from "./PopularMovies";
import MostWatchedMovies from "./MostWatchedMovies";
import { logout } from "../utils/auth"; 

function MovieList() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const fetchTrending = () => {
    setSearch("");
    setSearchResults([]);
    setShowSearch(false);
  };

  const searchMovies = async () => {
    if (search.trim() === "") {
      fetchTrending();
      return;
    }

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${search}`
      );
      setSearchResults(res.data.results);
      setShowSearch(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* 🔥 HEADER */}
      <div className="header">
        <div
          className="logo"
          onClick={fetchTrending}
          style={{ cursor: "pointer" }}
        >
          🎬 Movie's App
        </div>

        <div className="header-right">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") searchMovies();
              }}
            />
            <button onClick={searchMovies}>Search</button>
          </div>

          {/* Logout Button */}
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* 🔥 HERO SLIDER */}
      {!showSearch && <MovieSlider />}

      {/* 🔥 SEARCH RESULTS - clickable for add & rating */}
      {showSearch && searchResults.length > 0 && (
        <div className="movie-grid">
          {searchResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}

      {/* 🎯 WATCHED MOVIES */}
      <Watchlist />

      {/* Most Popular Movies Section */}
      <PopularMovies />

      <MostWatchedMovies />
    </div>
  );
}

export default MovieList;
