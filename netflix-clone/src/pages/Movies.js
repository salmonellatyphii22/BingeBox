import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Row from "../components/Row";

import axios from "../api/axios";
import requests from "../api/requests";

import "./Movies.css";

function Movies() {

    const [selectedMovie, setSelectedMovie] = useState(null);

    const [trendingMovies, setTrendingMovies] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [romanceMovies, setRomanceMovies] = useState([]);
    const [animationMovies, setAnimationMovies] = useState([]);
    const [oscarMovies, setOscarMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    //-------------------------------------------------------
    // Fetch Movies
    //-------------------------------------------------------

    useEffect(() => {

        let interval;

        const fetchMovies = async () => {

            try {

                const [

                    trendingRes,
                    actionRes,
                    comedyRes,
                    horrorRes,
                    romanceRes,
                    animationRes,
                    oscarRes,
                    upcomingRes,

                ] = await Promise.all([

                    axios.get(requests.fetchTrendingMovies),
                    axios.get(requests.fetchActionMovies),
                    axios.get(requests.fetchComedyMovies),
                    axios.get(requests.fetchHorrorMovies),
                    axios.get(requests.fetchRomanceMovies),
                    axios.get(requests.fetchAnimationMovies),
                    axios.get(requests.fetchOscarWinners),
                    axios.get(requests.fetchUpcomingMovies),

                ]);

                const trending = trendingRes.data.results || [];

                setTrendingMovies(trending);
                setActionMovies(actionRes.data.results || []);
                setComedyMovies(comedyRes.data.results || []);
                setHorrorMovies(horrorRes.data.results || []);
                setRomanceMovies(romanceRes.data.results || []);
                setAnimationMovies(animationRes.data.results || []);
                setOscarMovies(oscarRes.data.results || []);
                setUpcomingMovies(upcomingRes.data.results || []);

                //-------------------------------------------------
                // Random Banner
                //-------------------------------------------------

                if (trending.length > 0) {

                    const randomMovie =
                        trending[
                            Math.floor(
                                Math.random() * trending.length
                            )
                        ];

                    setSelectedMovie(randomMovie);

                    //-------------------------------------------------
                    // Auto Change Every 5 Seconds
                    //-------------------------------------------------

                    interval = setInterval(() => {

                        const random =
                            trending[
                                Math.floor(
                                    Math.random() * trending.length
                                )
                            ];

                        setSelectedMovie(random);

                    }, 5000);

                }

            } catch (error) {

                console.error(
                    "Error fetching movies:",
                    error
                );

            }

        };

        fetchMovies();

        //-------------------------------------------------------
        // Cleanup
        //-------------------------------------------------------

        return () => {

            if (interval) {

                clearInterval(interval);

            }

        };

    }, []);

    //-------------------------------------------------------

    return (

        <div className="movies">

            <Banner movie={selectedMovie} />

            <Row
                title="Trending Movies"
                movies={trendingMovies}
            />

            <Row
                title="Action"
                movies={actionMovies}
            />

            <Row
                title="Comedy"
                movies={comedyMovies}
            />

            <Row
                title="Horror"
                movies={horrorMovies}
            />

            <Row
                title="Romance"
                movies={romanceMovies}
            />

            <Row
                title="Animation"
                movies={animationMovies}
            />

            <Row
                title="Oscar Winners"
                movies={oscarMovies}
            />

            <Row
                title="Upcoming"
                movies={upcomingMovies}
            />

        </div>

    );

}

export default Movies;