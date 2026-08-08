import React, { useState } from "react";
import "./Row.css";
import HoverCard from "./HoverCard";

const BASE_URL = "https://image.tmdb.org/t/p/original";

function Row({
    title,
    movies = [],
    isLargeRow = false,
}) {

    const [hoverMovie, setHoverMovie] = useState(null);

    return (
        <div className="row">

            <h2>{title}</h2>

            <div className="row__posters">

                {movies.map((movie) => {

                    const imagePath = isLargeRow
                        ? movie.poster_path
                        : movie.backdrop_path;

                    if (!imagePath) return null;

                    return (

                        <div
                            key={movie.id}
                            className="poster-wrapper"
                            onMouseEnter={() => {
                                setHoverMovie(movie);
                            }}
                            onMouseLeave={() => {
                                setHoverMovie(null);
                            }}
                        >

                            <img
                                className={`row__poster ${
                                    isLargeRow ? "row__posterLarge" : ""
                                }`}
                                src={`${BASE_URL}${imagePath}`}
                                alt={movie.title || movie.name}
                            />

                            {hoverMovie?.id === movie.id && (
                                <HoverCard movie={movie} />
                            )}

                        </div>

                    );

                })}

            </div>

        </div>
    );
}

export default Row;