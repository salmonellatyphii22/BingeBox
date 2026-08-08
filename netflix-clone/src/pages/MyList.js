import React, { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../firebase";
import "./MyList.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const API_BASE = "http://localhost:8000";

function MyList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMyList();
  }, []);

  const fetchMyList = async () => {
    try {
      const token = await auth.currentUser.getIdToken();

      const res = await axios.get(`${API_BASE}/mylist/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies(res.data);
    } catch (err) {
      console.error("Failed to fetch My List", err);
    } finally {
      setLoading(false);
    }
  };

  const removeMovie = async (movieId) => {
    try {
      const token = await auth.currentUser.getIdToken();

      await axios.delete(`${API_BASE}/mylist/${movieId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMovies((prev) =>
        prev.filter((movie) => movie.movie_id !== movieId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="mylist-loading">
        Loading My List...
      </div>
    );
  }

  return (
    <div className="mylist">

      <div className="mylist-header">
        <h1>❤️ My List</h1>

        <p>{movies.length} Saved Titles</p>

        <input
          type="text"
          placeholder="Search your list..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredMovies.length === 0 ? (
        <div className="mylist-empty">
          <h2>❤️ Your list is empty</h2>

          <p>
            Browse and save movies you love.
          </p>
        </div>
      ) : (
        <div className="mylist-grid">
          {filteredMovies.map((movie) => (
            <div
              key={movie.movie_id}
              className="mylist-card"
            >
              <img
                src={`${IMAGE_BASE}${movie.poster_path}`}
                alt={movie.title}
              />

              <div className="mylist-overlay">

                <h3>{movie.title}</h3>

                <p>
                  ⭐ {movie.vote_average?.toFixed(1)}
                </p>

                <div className="mylist-buttons">

                  <button
                    className="watch-btn"
                  >
                    ▶ Watch
                  </button>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeMovie(movie.movie_id)
                    }
                  >
                    🗑 Remove
                  </button>

                </div>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyList;