import React from "react";
import { useNavigate } from "react-router-dom";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MyListPreview({ movies = [] }) {
  const navigate = useNavigate();

  return (
    <section className="profile-section">

      <div className="section-header">

        <h2>❤️ My List</h2>

        <button
          className="view-all-btn"
          onClick={() => navigate("/mylist")}
        >
          View All →
        </button>

      </div>

      {movies.length === 0 ? (

        <div className="profile-empty-card">
          <p>No titles saved to My List.</p>
        </div>

      ) : (

        <div className="mylist-preview-grid">

          {movies.slice(0, 6).map((movie) => (

            <div
              key={movie.movie_id || movie.id}
              className="mylist-preview-card"
            >

              <img
                src={`${IMAGE_BASE}${
                  movie.poster_path ||
                  movie.backdrop_path
                }`}
                alt={movie.title}
              />

              <div className="mylist-preview-overlay">

                <h4>{movie.title}</h4>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default MyListPreview;