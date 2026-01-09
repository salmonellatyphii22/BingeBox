import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import MovieCard from "./MovieCard";
import "./Row.css";

export default function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!fetchUrl) {
          console.error("Missing fetchUrl for row:", title);
          return;
        }

        const res = await axios.get(fetchUrl);
        setMovies(res.data?.results || []);
        setError(false);
      } catch (err) {
        console.error("Row fetch error:", title, err);
        setMovies([]);
        setError(true);
      }
    }

    fetchData();
  }, [fetchUrl, title]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
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
