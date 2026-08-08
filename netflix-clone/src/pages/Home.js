import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Row from "../components/Row";

import axios from "../api/axios";
import requests from "../api/requests";

import "./Home.css";

function Home() {

    const [selectedMovie, setSelectedMovie] = useState(null);

    const [trending, setTrending] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [actionMovies, setActionMovies] = useState([]);
    const [comedyMovies, setComedyMovies] = useState([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [romanceMovies, setRomanceMovies] = useState([]);

    //-------------------------------------------------------
    // Fetch Movies
    //-------------------------------------------------------

    useEffect(() => {

        let interval;

        const fetchMovies = async () => {

            try {

                const [

                    trendingRes,
                    topRatedRes,
                    actionRes,
                    comedyRes,
                    horrorRes,
                    romanceRes,

                ] = await Promise.all([

                    axios.get(requests.fetchTrending),
                    axios.get(requests.fetchTopRated),
                    axios.get(requests.fetchActionMovies),
                    axios.get(requests.fetchComedyMovies),
                    axios.get(requests.fetchHorrorMovies),
                    axios.get(requests.fetchRomanceMovies),

                ]);

                const trendingMovies =
                    trendingRes.data.results || [];

                setTrending(trendingMovies);
                setTopRated(topRatedRes.data.results || []);
                setActionMovies(actionRes.data.results || []);
                setComedyMovies(comedyRes.data.results || []);
                setHorrorMovies(horrorRes.data.results || []);
                setRomanceMovies(romanceRes.data.results || []);

                //-------------------------------------------------
                // Initial Random Banner
                //-------------------------------------------------

                if (trendingMovies.length > 0) {

                    const randomMovie =
                        trendingMovies[
                            Math.floor(
                                Math.random() *
                                trendingMovies.length
                            )
                        ];

                    setSelectedMovie(randomMovie);

                    //-------------------------------------------------
                    // Auto Change Every 5 Seconds
                    //-------------------------------------------------

                    interval = setInterval(() => {

                        const random =
                            trendingMovies[
                                Math.floor(
                                    Math.random() *
                                    trendingMovies.length
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

        <div className="home">

            <Banner movie={selectedMovie} />

            <Row
                title="Trending Now"
                movies={trending}
            />

            <Row
                title="Top Rated"
                movies={topRated}
            />

            <Row
                title="Action Movies"
                movies={actionMovies}
            />

            <Row
                title="Comedy Movies"
                movies={comedyMovies}
            />

            <Row
                title="Horror Movies"
                movies={horrorMovies}
            />

            <Row
                title="Romance Movies"
                movies={romanceMovies}
            />

        </div>

    );

}

export default Home;