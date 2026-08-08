import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import "./TVBanner.css";

const BASE_URL = "https://image.tmdb.org/t/p/original";

function TVBanner({ fetchUrl }) {

    const [show, setShow] = useState(null);

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

            // Show one random show immediately
            const randomShow =
                results[Math.floor(Math.random() * results.length)];

            setShow(randomShow);

            // Change banner every 5 seconds
            interval = setInterval(() => {

                const random =
                    results[Math.floor(Math.random() * results.length)];

                setShow(random);

            }, 5000);

        } catch (error) {

            console.error("Error fetching TV Banner:", error);

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

    if (!show) return null;

    //--------------------------------------------------

    return (

        <header
            className="tvBanner"
            style={{
                backgroundImage: `url(${BASE_URL}${show.backdrop_path})`,
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

                    <button className="tvBanner__button">

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