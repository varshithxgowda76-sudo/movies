import { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { TMDB_API_KEY } from "../api";
import "./MovieSlider.css";

function MovieSlider() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    setMovies(res.data.results.slice(0, 10)); // 🔥 only 10 movies
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {movies.map(movie => (
          <div key={movie.id} className="slider-item">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title}
            />
            <div className="slider-info">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MovieSlider;
