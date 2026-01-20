import React from "react";
import "./Row.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";

function Row({ title, movies = [], isLargeRow = false }) {
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <img
                key={movie.id}
                className={`row__poster ${
                  isLargeRow && "row__posterLarge"
                }`}
                src={`${BASE_URL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.title || movie.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
