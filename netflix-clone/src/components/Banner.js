
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../firebase";
import "./Banner.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";
const API_BASE = "https://bingebox-backend-pcxq.onrender.com";

export default function Banner({ movie }) {
    const navigate = useNavigate();

    if (!movie) return null;

    const playMovie = async () => {
        try {
            // Redirect to login if the user is not authenticated
            if (!auth.currentUser) {
                navigate("/login");
                return;
            }

            const token = await auth.currentUser.getIdToken();

            // Save movie to watch history
            await axios.post(
                `${API_BASE}/history/`,
                {
                    movie_id: movie.id,
                    title: movie.title || movie.name,
                    poster_path: movie.poster_path,
                    backdrop_path: movie.backdrop_path,
                    overview: movie.overview,
                    release_date:
                        movie.release_date ||
                        movie.first_air_date,
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

        // Navigate to the watch page
        navigate(`/watch/${movie.id}`);
    };

    return (
        <header
            className="banner"
            style={{
                backgroundImage: movie.backdrop_path
                    ? `url(${BASE_URL}${movie.backdrop_path})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}
        >
            {/* Banner Content */}
            <div className="banner-content">

                {/* Movie Title */}
                <h1 className="banner-title">
                    {movie.title ||
                        movie.name ||
                        movie.original_name}
                </h1>

                {/* Description */}
                <p className="banner-description">
                    {movie.overview}
                </p>

                {/* Movie Info */}
                <div className="banner-meta">

                    {movie.vote_average && (
                        <span>
                            ⭐ {movie.vote_average.toFixed(1)}
                        </span>
                    )}

                    {(movie.release_date ||
                        movie.first_air_date) && (
                        <span>
                            {movie.release_date ||
                                movie.first_air_date}
                        </span>
                    )}

                </div>

                {/* Play Button */}
                <div className="banner__buttons">
                    <button
                        className="banner-btn"
                        onClick={playMovie}
                        type="button"
                    >
                        ▶ Play
                    </button>
                </div>

            </div>

            <div className="fade-bottom"></div>
        </header>
    );
}