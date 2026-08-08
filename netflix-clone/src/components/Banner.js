import React from "react";
import "./Banner.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";

export default function Banner({ movie }) {

    if (!movie) return null;

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

                    {movie.release_date && (

                        <span>

                            {movie.release_date}

                        </span>

                    )}

                </div>

                {/* Play Button */}

                <div className="banner__buttons">

                    <button className="banner-btn">

                        ▶ Play

                    </button>

                </div>

            </div>

            <div className="fade-bottom"></div>

        </header>

    );

}