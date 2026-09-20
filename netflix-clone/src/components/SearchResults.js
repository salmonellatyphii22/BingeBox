
import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import HoverCard from "../components/HoverCard";
import "./SearchResults.css";

const BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_BASE = "https://bingebox-backend-pcxq.onrender.com";

function SearchResults({ query, results }) {
  const navigate = useNavigate();
  const [hoveredMovie, setHoveredMovie] = useState(null);

  if (!results || results.length === 0) {
    return null;
  }

  const topResult = results[0];
  const moreLikeThis = results.slice(1);

  // Play button functionality for Top Result
  const playMovie = async (movie) => {
    try {
      if (!auth.currentUser) {
        navigate("/login");
        return;
      }

      const token = await auth.currentUser.getIdToken();

      await axios.post(
        `${API_BASE}/history/`,
        {
          movie_id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          overview: movie.overview,
          release_date:
            movie.release_date || movie.first_air_date,
          media_type:
            movie.media_type ||
            (movie.title ? "movie" : "tv"),
          vote_average: movie.vote_average,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error(
        "Failed to save watch history:",
        error
      );
    }

    navigate(`/watch/${movie.id}`);
  };

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
            <h2>
              {topResult.title || topResult.name}
            </h2>

            <p>
              {topResult.overview ||
                "No description available."}
            </p>

            <p>
              ⭐ {topResult.vote_average?.toFixed(1)}
            </p>

            <p>
              {topResult.release_date ||
                topResult.first_air_date ||
                "Release date unavailable"}
            </p>

            {/* Top Result Play Button */}
            <button
              className="top-play-btn"
              onClick={() => playMovie(topResult)}
            >
              <FaPlay />
              <span>Watch Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* More Like This */}
      <section className="more-like-this">
        <h3>More Like This</h3>

        <div className="results-grid">
          {moreLikeThis.map((movie) => (
            <div
              className="movie-card-wrapper"
              key={`${movie.id}-${movie.media_type || "unknown"}`}
              onMouseEnter={() => setHoveredMovie(movie.id)}
              onMouseLeave={() => setHoveredMovie(null)}
            >
              {/* Movie Poster and Title */}
              <div className="movie-card">
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

              {/* HoverCard with Play and Like Buttons */}
              {hoveredMovie === movie.id && (
                <div className="search-hover-card">
                  <HoverCard movie={movie} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default SearchResults;