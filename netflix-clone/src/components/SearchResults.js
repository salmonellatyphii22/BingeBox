import React from "react";
import "./SearchResults.css";

const BASE_URL = "https://image.tmdb.org/t/p/w500";

function SearchResults({ query, results }) {
  if (!results || results.length === 0) {
    return null;
  }

  const topResult = results[0];
  const moreLikeThis = results.slice(1);

  return (
    <div className="search-results">

      <h2 className="search-heading">
        Results for "{query}"
      </h2>

      {/* Top Result */}
      <section className="top-result-section">
        <h3>Top Result</h3>

        <div className="top-result-card">
          <img
            src={
              topResult.poster_path
                ? `${BASE_URL}${topResult.poster_path}`
                : "https://via.placeholder.com/250x375?text=No+Image"
            }
            alt={topResult.title || topResult.name}
          />

          <div className="top-result-info">
            <h2>{topResult.title || topResult.name}</h2>

            <p>
              {topResult.overview || "No description available."}
            </p>

            <p>
              ⭐ {topResult.vote_average?.toFixed(1)}
            </p>

            <p>
              {topResult.release_date ||
                topResult.first_air_date}
            </p>
          </div>
        </div>
      </section>

      {/* More Like This */}
      <section className="more-like-this">
        <h3>More Like This</h3>

        <div className="results-grid">
          {moreLikeThis.map((movie) => (
            <div
              className="movie-card"
              key={movie.id}
            >
              <img
                src={
                  movie.poster_path
                    ? `${BASE_URL}${movie.poster_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={movie.title || movie.name}
              />

              <h4>
                {movie.title || movie.name}
              </h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchResults;