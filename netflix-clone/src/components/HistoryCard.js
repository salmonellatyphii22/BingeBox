import React, { useState } from "react";
import axios from "axios";
import {
    FaPlay,
    FaHeart,
    FaRegHeart,
    FaStar,
    FaRegStar,
    FaPen,
} from "react-icons/fa";

import { auth } from "../firebase";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const API_BASE = "http://127.0.0.1:8000";

function HistoryCard({ movie, refreshHistory }) {

    const [liked, setLiked] = useState(
        movie.in_my_list || false
    );

    const [rating, setRating] = useState(
        movie.user_rating || 0
    );

    //-------------------------------------------------------
    // Firebase Token
    //-------------------------------------------------------

    const getToken = async () => {

        if (!auth.currentUser) return null;

        return await auth.currentUser.getIdToken();

    };

    //-------------------------------------------------------
    // Add / Remove My List
    //-------------------------------------------------------

    const toggleMyList = async () => {

        try {

            const token = await getToken();

            if (!liked) {

                await axios.post(

                    `${API_BASE}/mylist/`,

                    {
                        movie_id: movie.movie_id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        backdrop_path: movie.backdrop_path,
                        overview: movie.overview,
                        release_date: movie.release_date,
                        vote_average: movie.vote_average,
                        runtime: movie.runtime,
                        media_type: movie.media_type,
                    },

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }

                );

                setLiked(true);

            } else {

                await axios.delete(

                    `${API_BASE}/mylist/${movie.movie_id}`,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }

                );

                setLiked(false);

            }

        } catch (err) {

            console.error(err);

        }

    };

    //-------------------------------------------------------
    // Save Rating
    //-------------------------------------------------------

    const saveRating = async (value) => {

        try {

            setRating(value);

            const token = await getToken();

            await axios.post(

                `${API_BASE}/ratings/`,

                {
                    movie_id: movie.movie_id,
                    rating: value,
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

        } catch (err) {

            console.error(err);

        }

    };

    //-------------------------------------------------------

    const writeReview = () => {

        console.log("Open Review Modal");

    };

    //-------------------------------------------------------

    const watchAgain = () => {

        console.log("Watch Again", movie.movie_id);

    };

    //-------------------------------------------------------

    return (

        <div className="history-card">

            {/* Poster */}

            <img
                src={`${IMAGE_BASE}${movie.poster_path}`}
                alt={movie.title}
                className="history-card-poster"
            />

            {/* Content */}

            <div className="history-card-content">

                <h3>{movie.title}</h3>

                <div className="history-card-meta">

                    <span>

                        ⭐ {movie.vote_average?.toFixed(1)}

                    </span>

                    <span>

                        {(movie.release_date || "").substring(0, 4)}

                    </span>

                    <span>

                        {movie.media_type === "tv"
                            ? "TV Show"
                            : "Movie"}

                    </span>

                </div>

                {/* Genres */}

                {movie.genres?.length > 0 && (

                    <div className="history-card-genres">

                        {movie.genres.map((genre) => (

                            <span key={genre}>

                                {genre}

                            </span>

                        ))}

                    </div>

                )}

                {/* Runtime */}

                <p className="history-runtime">

                    Runtime : {movie.runtime || "--"} min

                </p>

                {/* Date Watched */}

                <p className="history-date">

                    Watched{" "}

                    {movie.last_watched
                        ? new Date(
                              movie.last_watched
                          ).toLocaleDateString()
                        : "--"}

                </p>

                {/* Buttons */}

                <div className="history-card-actions">

                    <button
                        className="watch-again-btn"
                        onClick={watchAgain}
                    >

                        <FaPlay />

                        Watch Again

                    </button>

                    <button
                        className="mylist-btn"
                        onClick={toggleMyList}
                    >

                        {liked ? (
                            <FaHeart />
                        ) : (
                            <FaRegHeart />
                        )}

                    </button>

                </div>

                {/* Rating */}

                <div className="history-rating">

                    {[1, 2, 3, 4, 5].map((star) => (

                        <button
                            key={star}
                            className="rating-star-btn"
                            onClick={() => saveRating(star)}
                        >

                            {star <= rating ? (
                                <FaStar />
                            ) : (
                                <FaRegStar />
                            )}

                        </button>

                    ))}

                </div>

                {/* Review */}

                <button
                    className="review-btn"
                    onClick={writeReview}
                >

                    <FaPen />

                    Write Review

                </button>

            </div>

        </div>

    );

}

export default HistoryCard;