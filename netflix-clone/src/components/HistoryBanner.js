import React from "react";
import { FaPlay, FaInfoCircle } from "react-icons/fa";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function HistoryBanner({ movie }) {

    if (!movie) {
        return (
            <div className="history-banner history-banner-empty">
                <div className="history-banner-overlay" />

                <div className="history-banner-content">

                    <h1>Your Watch History</h1>

                    <p>
                        Start watching movies and TV shows to
                        build your history.
                    </p>

                </div>
            </div>
        );
    }

    const title =
        movie.title ||
        movie.name;

    const overview =
        movie.overview?.length > 220
            ? movie.overview.substring(0, 220) + "..."
            : movie.overview;

    const year =
        (
            movie.release_date ||
            movie.first_air_date ||
            ""
        ).substring(0, 4);

    const progress =
        movie.progress || 0;

    return (

        <header
            className="history-banner"
            style={{
                backgroundImage: `url(${IMAGE_BASE}${movie.backdrop_path})`,
            }}
        >

            <div className="history-banner-overlay" />

            <div className="history-banner-content">

                <span className="history-banner-tag">
                    Continue Watching
                </span>

                <h1 className="history-banner-title">
                    {title}
                </h1>

                <div className="history-banner-meta">

                    <span>
                        ⭐ {movie.vote_average?.toFixed(1)}
                    </span>

                    <span>{year}</span>

                    <span>
                        {movie.media_type === "tv"
                            ? "TV Show"
                            : "Movie"}
                    </span>

                    {movie.runtime && (
                        <span>
                            {movie.runtime} min
                        </span>
                    )}

                </div>

                <p className="history-banner-description">
                    {overview}
                </p>

                {/* Progress */}

                <div className="history-banner-progress">

                    <div className="history-progress-track">

                        <div
                            className="history-progress-fill"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                    <span className="history-progress-text">

                        {progress}% Completed

                    </span>

                </div>

                {/* Buttons */}

                <div className="history-banner-buttons">

                    <button
                        className="history-play-btn"
                    >
                        <FaPlay />

                        Continue Watching

                    </button>

                    <button
                        className="history-info-btn"
                    >
                        <FaInfoCircle />

                        More Info

                    </button>

                </div>

            </div>

            <div className="history-banner-fade" />

        </header>

    );
}

export default HistoryBanner;