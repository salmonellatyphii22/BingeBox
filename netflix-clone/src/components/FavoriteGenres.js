import React from "react";
import {
  FaFire,
  FaRobot,
  FaMask,
  FaSkull,
  FaBolt,
  FaDragon,
} from "react-icons/fa";

function FavoriteGenres({ genres = [], profile }) {
  // Default genres if backend hasn't been implemented yet
  const defaultGenres = [
    {
      name: "Action",
      count: 41,
      icon: <FaBolt />,
      color: "#ff4b4b",
    },
    {
      name: "Sci-Fi",
      count: 29,
      icon: <FaRobot />,
      color: "#3b82f6",
    },
    {
      name: "Anime",
      count: 24,
      icon: <FaDragon />,
      color: "#8b5cf6",
    },
    {
      name: "Thriller",
      count: 18,
      icon: <FaMask />,
      color: "#f59e0b",
    },
    {
      name: "Horror",
      count: 11,
      icon: <FaSkull />,
      color: "#ef4444",
    },
    {
      name: "Adventure",
      count: 15,
      icon: <FaFire />,
      color: "#22c55e",
    },
  ];

  const data = genres.length ? genres : defaultGenres;

  return (
    <section className="profile-section">

      <div className="section-header">
        <h2>❤️ Favorites</h2>
      </div>

      <div className="favorite-container">

        {/* Favorite Genres */}

        <div className="favorite-card">

          <h3>Top Genres</h3>

          <div className="favorite-grid">

            {data.map((genre, index) => (
              <div
                key={index}
                className="favorite-item"
              >
                <div
                  className="favorite-icon"
                  style={{
                    background: genre.color,
                  }}
                >
                  {genre.icon}
                </div>

                <div className="favorite-info">
                  <h4>{genre.name}</h4>
                  <span>
                    {genre.count} titles watched
                  </span>
                </div>
              </div>
            ))}

          </div>

        </div>

        {/* Favorite Actors */}

        <div className="favorite-card">

          <h3>Top Actors</h3>

          <div className="favorite-tags">

            <span>Tom Cruise</span>

            <span>Leonardo DiCaprio</span>

            <span>Robert Downey Jr.</span>

            <span>Keanu Reeves</span>

            <span>Scarlett Johansson</span>

            <span>Ryan Reynolds</span>

          </div>

        </div>

        {/* Favorite Directors */}

        <div className="favorite-card">

          <h3>Favorite Directors</h3>

          <div className="favorite-tags">

            <span>Christopher Nolan</span>

            <span>Steven Spielberg</span>

            <span>Denis Villeneuve</span>

            <span>Quentin Tarantino</span>

            <span>James Cameron</span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default FavoriteGenres;