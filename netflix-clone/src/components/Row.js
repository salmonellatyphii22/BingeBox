import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import MovieCard from "./MovieCard";
import "./Row.css";

export default function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);   // always start with empty array
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(fetchUrl);

        // TMDB returns data in res.data.results
        if (res.data && res.data.results) {
          setMovies(res.data.results);
        } else {
          setMovies([]);
          setError(true);
        }
      } catch (err) {
        console.error("TMDB fetch error:", err);
        setError(true);
      }
    }

    fetchData();
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies?.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isLargeRow={isLargeRow}
          />
        ))}
      </div>

      {error && <p style={{ color: "red" }}>Failed to load movies</p>}
    </div>
  );
}
