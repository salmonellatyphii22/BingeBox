import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  FaPlay,
  FaHeart,
  FaCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./HoverCard.css";

const API_BASE = "http://localhost:8000";

function HoverCard({ movie }) {
  const navigate = useNavigate();

  const [inWatchlist, setInWatchlist] = useState(false);
  const [loadingWatchlist, setLoadingWatchlist] = useState(false);

  const getToken = async () => {
    if (!auth.currentUser) return null;
    return await auth.currentUser.getIdToken();
  };

  const checkWatchlist = useCallback(async () => {
    if (!movie || !auth.currentUser) return;

    try {
      const token = await getToken();

      const res = await axios.get(
        `${API_BASE}/mylist/check/${movie.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInWatchlist(res.data.exists);
    } catch (err) {
      console.log("Watchlist check failed:", err.message);
      setInWatchlist(false);
    }
  }, [movie]);

  useEffect(() => {
    checkWatchlist();
  }, [checkWatchlist]);

  //--------------------------------------------------
  // Add / Remove My List
  //--------------------------------------------------

  const toggleWatchlist = async () => {
    try {
      if (!auth.currentUser) return;

      setLoadingWatchlist(true);

      const token = await getToken();

      if (!inWatchlist) {
        await axios.post(
          `${API_BASE}/mylist/`,
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

        setInWatchlist(true);
      } else {
        await axios.delete(
          `${API_BASE}/mylist/${movie.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInWatchlist(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWatchlist(false);
    }
  };

  //--------------------------------------------------
  // Play Movie
  //--------------------------------------------------

  const playMovie = async () => {
    try {
      if (!auth.currentUser) {
        navigate("/login");
        return;
      }

      const token = await getToken();

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
    } catch (err) {
      console.error("Failed to save watch history:", err);
    }

    navigate(`/watch/${movie.id}`);
  };

  //--------------------------------------------------

  if (!movie) return null;

  return (
    <div className="hover-card">
      <div className="hover-card-content">

        <h3 className="hover-card-title">
          {movie.title || movie.name}
        </h3>

        <div className="hover-actions">

          <button
            className="watch-btn"
            onClick={playMovie}
          >
            <FaPlay />
            <span>Watch Now</span>
          </button>

          <button
            className={`watchlist-btn ${
              inWatchlist ? "liked" : ""
            }`}
            onClick={toggleWatchlist}
            disabled={loadingWatchlist}
          >
            {inWatchlist ? <FaCheck /> : <FaHeart />}
          </button>

        </div>

        <div className="hover-card-meta">

          <span className="rating">
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>

          <span>
            {(movie.release_date ||
              movie.first_air_date ||
              "").substring(0, 4)}
          </span>

          <span>•</span>

          <span>
            {movie.title ? "Movie" : "TV"}
          </span>

        </div>

        <p>
          {movie.overview?.length > 120
            ? movie.overview.substring(0, 120) + "..."
            : movie.overview}
        </p>

      </div>
    </div>
  );
}

export default HoverCard;