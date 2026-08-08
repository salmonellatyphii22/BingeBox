import React from "react";
import { FaStar } from "react-icons/fa";

function RatingsPreview({ ratings = [] }) {
  return (
    <section className="profile-section">
      <div className="section-header">
        <h2>Your Ratings</h2>
      </div>

      {ratings.length === 0 ? (
        <div className="empty-card">
          <p>You haven't rated any titles yet.</p>
        </div>
      ) : (
        <div className="ratings-list">
          {ratings.slice(0, 5).map((movie) => (
            <div
              key={movie.movie_id || movie.id}
              className="rating-item"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />

              <div className="rating-info">
                <h3>{movie.title}</h3>

                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= Math.round((movie.rating || 0) / 2)
                          ? "filled-star"
                          : "empty-star"
                      }
                    />
                  ))}

                  <span className="rating-score">
                    {movie.rating?.toFixed(1) || "0.0"}
                  </span>
                </div>

                <p>
                  Rated on{" "}
                  {movie.created_at
                    ? new Date(
                        movie.created_at
                      ).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default RatingsPreview;