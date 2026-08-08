import React from "react";
import { FaPlay } from "react-icons/fa";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function ContinueWatching({ movies = [] }) {

    if (!movies.length) {
        return null;
    }

    return (

        <section className="continue-section">

            <h2 className="continue-title">
                Continue Watching
            </h2>

            <div className="continue-slider">

                {movies.map((movie) => {

                    const title =
                        movie.title ||
                        movie.name;

                    const progress =
                        movie.progress || 0;

                    const runtime =
                        movie.runtime || 120;

                    const watched =
                        movie.watched_time ||
                        Math.round(runtime * progress / 100);

                    const remaining =
                        runtime - watched;

                    return (

                        <div
                            key={movie.movie_id || movie.id}
                            className="continue-card"
                        >

                            {/* Thumbnail */}

                            <img
                                src={`${IMAGE_BASE}${movie.backdrop_path || movie.poster_path}`}
                                alt={title}
                                className="continue-image"
                            />

                            {/* Overlay */}

                            <div className="continue-overlay">

                                <h3>
                                    {title}
                                </h3>

                                {/* Episode */}

                                {movie.media_type === "tv" &&
                                    movie.episode && (

                                        <p className="continue-episode">

                                            Season {movie.season || 1}
                                            {" • "}
                                            Episode {movie.episode}

                                        </p>

                                    )}

                                {/* Progress */}

                                <div className="continue-progress">

                                    <div className="continue-progress-track">

                                        <div
                                            className="continue-progress-fill"
                                            style={{
                                                width: `${progress}%`,
                                            }}
                                        />

                                    </div>

                                    <span>

                                        {progress}% Watched

                                    </span>

                                </div>

                                {/* Remaining Time */}

                                <p className="continue-time">

                                    {remaining > 0
                                        ? `${remaining} min remaining`
                                        : "Completed"}

                                </p>

                                {/* Resume */}

                                <button
                                    className="continue-btn"
                                >

                                    <FaPlay />

                                    Resume

                                </button>

                            </div>

                        </div>

                    );

                })}

            </div>

        </section>

    );
}

export default ContinueWatching;