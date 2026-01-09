import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Banner.css";

export default function Banner() {
  const [movie, setMovie] = useState(null);   // must be null, not []

  useEffect(() => {
    async function fetchData() {
      try {
        // FIXED typo: fetchTrending
        const request = await axios.get(requests.fetchTrending);

        const results = request.data?.results || [];

        if (results && results.length > 0) {
          setMovie(results[Math.floor(Math.random() * results.length)]);
        }
      } catch (error) {
        console.error("Banner API error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: movie
          ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
          : "none",
        backgroundPosition: "center top",
      }}
    >
      <div className="banner-content">
        <h1>{movie?.title || movie?.name || movie?.original_name}</h1>
        <p className="description">{movie?.overview}</p>

        <div className="banner__buttons">
          <button className="banner-btn">Play</button>
          <button className="banner-btn">More Info</button>
        </div>
      </div>

      <div className="fade-bottom"></div>
    </header>
  );
}
