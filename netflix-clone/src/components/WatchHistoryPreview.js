import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHistory, FaPlay } from "react-icons/fa";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function WatchHistoryPreview({ history = [] }) {
  const navigate = useNavigate();

  return (
    <section className="profile-section">

      <div className="section-header">

        <h2>
          <FaHistory />
          &nbsp; Recently Watched
        </h2>

        <button
          className="view-all-btn"
          onClick={() => navigate("/history")}
        >
          View All →
        </button>

      </div>

      {history.length === 0 ? (

        <div className="profile-empty-card">

          <h3>No Watch History</h3>

          <p>
            Start watching movies or TV shows to build your
            history.
          </p>

        </div>

      ) : (

        <div className="history-preview-list">

          {history.slice(0, 5).map((movie) => (

            <div
              key={movie.movie_id || movie.id}
              className="history-preview-card"
            >

              <img
                src={`${IMAGE_BASE}${
                  movie.poster_path ||
                  movie.backdrop_path
                }`}
                alt={movie.title}
                className="history-preview-poster"
              />

              <div className="history-preview-info">

                <h3>{movie.title}</h3>

                <p>

                  {movie.last_watched
                    ? new Date(
                        movie.last_watched
                      ).toLocaleDateString()
                    : "Recently watched"}

                </p>

                <div className="history-preview-meta">

                  <span>
                    ⭐ {movie.vote_average?.toFixed(1)}
                  </span>

                  <span>
                    {movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : ""}
                  </span>

                </div>

              </div>

              <button
                className="history-watch-btn"
                onClick={() =>
                  navigate(`/watch/${movie.movie_id || movie.id}`)
                }
              >

                <FaPlay />

                Watch Again

              </button>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default WatchHistoryPreview;