
import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./TVBanner.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";
const API_BASE = "https://bingebox-backend-pcxq.onrender.com";

function TVBanner({ fetchUrl }) {
    const [show, setShow] = useState(null);
    const navigate = useNavigate();

    //--------------------------------------------------
    // Fetch Random TV Show
    //--------------------------------------------------

    useEffect(() => {
        let interval;

        const fetchData = async () => {
            try {
                const request = await axios.get(fetchUrl);

                const results = request.data.results || [];

                if (results.length === 0) return;

                const randomShow =
                    results[
                        Math.floor(Math.random() * results.length)
                    ];

                setShow(randomShow);

                // Change banner every 5 seconds
                interval = setInterval(() => {
                    const random =
                        results[
                            Math.floor(Math.random() * results.length)
                        ];

                    setShow(random);
                }, 5000);

            } catch (error) {
                console.error(
                    "Error fetching TV Banner:",
                    error
                );
            }
        };

        fetchData();

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [fetchUrl]);

    //--------------------------------------------------
    // Truncate Description
    //--------------------------------------------------

    const truncate = (str, n) => {
        if (!str) return "";

        return str.length > n
            ? str.substring(0, n - 1) + "..."
            : str;
    };

    //--------------------------------------------------
    // Play TV Show
    //--------------------------------------------------

    const playShow = async () => {
        try {
            // Redirect to login if user is not authenticated
            if (!auth.currentUser) {
                navigate("/login");
                return;
            }

            const token = await auth.currentUser.getIdToken();

            // Save TV show to watch history
            await axios.post(
                `${API_BASE}/history/`,
                {
                    movie_id: show.id,
                    title: show.name || show.original_name,
                    poster_path: show.poster_path,
                    backdrop_path: show.backdrop_path,
                    overview: show.overview,
                    release_date: show.first_air_date,
                    media_type: "tv",
                    vote_average: show.vote_average,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

        } catch (error) {
            console.error(
                "Failed to save TV show history:",
                error
            );
        }

        // Navigate to watch page
        navigate(`/watch/${show.id}`);
    };

    //--------------------------------------------------

    if (!show) return null;

    //--------------------------------------------------

    return (
        <header
            className="tvBanner"
            style={{
                backgroundImage: show.backdrop_path
                    ? `url(${BASE_URL}${show.backdrop_path})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center center",
            }}
        >
            <div className="tvBanner__contents">

                {/* Title */}

                <h1 className="tvBanner__title">
                    {show.name ||
                        show.original_name ||
                        show.title}
                </h1>

                {/* Play Button */}

                <div className="tvBanner__buttons">
                    <button
                        className="tvBanner__button"
                        onClick={playShow}
                        type="button"
                    >
                        ▶ Play
                    </button>
                </div>

                {/* Description */}

                <p className="tvBanner__description">
                    {truncate(show.overview, 180)}
                </p>

                {/* Information */}

                <div className="tvBanner__info">
                    <span>
                        ⭐ {show.vote_average?.toFixed(1)}
                    </span>

                    <span>
                        📅 {show.first_air_date}
                    </span>

                    <span>
                        🌍 {show.original_language?.toUpperCase()}
                    </span>
                </div>

            </div>

            <div className="tvBanner--fadeBottom"></div>
        </header>
    );
}

export default TVBanner;