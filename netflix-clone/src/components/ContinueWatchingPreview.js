import React from "react";
import {
    FaPlay,
    FaClock,
} from "react-icons/fa";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function ContinueWatchingPreview({ movies }) {

    if (!movies || movies.length === 0) return null;

    return (

        <section className="continue-preview-section">

            <div className="section-header">

                <h2>Continue Watching</h2>

                <p>Pick up where you left off</p>

            </div>

            <div className="continue-preview-grid">

                {movies.slice(0, 4).map((movie) => {

                    const progress =
                        movie.progress || 0;

                    return (

                        <div
                            key={movie.movie_id}
                            className="continue-preview-card"
                        >

                            <img
                                src={
                                    movie.backdrop_path
                                        ? `${IMAGE_BASE}${movie.backdrop_path}`
                                        : `${IMAGE_BASE}${movie.poster_path}`
                                }
                                alt={movie.title}
                            />

                            <div className="continue-preview-overlay">

                                <h3>

                                    {movie.title}

                                </h3>

                                <div className="continue-preview-info">

                                    <span>

                                        {movie.media_type === "tv"
                                            ? "TV Show"
                                            : "Movie"}

                                    </span>

                                    {movie.season_number && (

                                        <span>

                                            S{movie.season_number}
                                            {" "}
                                            E{movie.episode_number}

                                        </span>

                                    )}

                                </div>

                                <div className="progress-wrapper">

                                    <div className="progress-bar">

                                        <div
                                            className="progress-fill"
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        />

                                    </div>

                                    <span>

                                        {progress}%

                                    </span>

                                </div>

                                <div className="continue-footer">

                                    <div className="remaining-time">

                                        <FaClock />

                                        <span>

                                            {movie.runtime
                                                ? `${movie.runtime - (movie.watched_time || 0)} min left`
                                                : `${100 - progress}% remaining`}

                                        </span>

                                    </div>

                                    <button
                                        className="resume-btn"
                                    >

                                        <FaPlay />

                                        Resume

                                    </button>

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

        </section>

    );

}

export default ContinueWatchingPreview;