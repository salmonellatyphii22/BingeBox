import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";

export default function Banner() {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  // Fetch trending movies
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(requests.fetchTrending);
        setMovies(res.data?.results || []);
      } catch (error) {
        console.error("Banner API error:", error);
      }
    }
    fetchData();
  }, []);

  // Auto-slide banner every 5 seconds
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  const movie = movies[index];

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie?.backdrop_path
          ? `url(${BASE_URL}${movie.backdrop_path})`
          : "none",
        backgroundPosition: "center top",
      }}
    >
      <div className="banner-content">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <p className="banner-description">
          {movie?.overview}
        </p>

        <div className="banner__buttons">
          <button className="banner-btn">Play</button>
          <button className="banner-btn">More Info</button>
        </div>
      </div>

      <div className="fade-bottom"></div>
    </header>
  );
}
