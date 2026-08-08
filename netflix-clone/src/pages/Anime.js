import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Row from "../components/Row";

import axios from "../api/axios";
import requests from "../api/requests";

import "./Anime.css";

function Anime() {

    const [selectedAnime, setSelectedAnime] = useState(null);

    const [trendingAnime, setTrendingAnime] = useState([]);
    const [popularAnime, setPopularAnime] = useState([]);
    const [topRatedAnime, setTopRatedAnime] = useState([]);
    const [actionAnime, setActionAnime] = useState([]);
    const [fantasyAnime, setFantasyAnime] = useState([]);
    const [romanceAnime, setRomanceAnime] = useState([]);
    const [comedyAnime, setComedyAnime] = useState([]);
    const [sciFiAnime, setSciFiAnime] = useState([]);
    const [recentAnime, setRecentAnime] = useState([]);

    //-------------------------------------------------------
    // Fetch Anime
    //-------------------------------------------------------

    useEffect(() => {

        let interval;

        const fetchAnime = async () => {

            try {

                const [

                    trendingRes,
                    popularRes,
                    topRatedRes,
                    actionRes,
                    fantasyRes,
                    romanceRes,
                    comedyRes,
                    sciFiRes,
                    recentRes,

                ] = await Promise.all([

                    axios.get(requests.fetchTrendingAnime),
                    axios.get(requests.fetchPopularAnime),
                    axios.get(requests.fetchTopRatedAnime),
                    axios.get(requests.fetchActionAdventureAnime),
                    axios.get(requests.fetchFantasyAnime),
                    axios.get(requests.fetchRomanceAnime),
                    axios.get(requests.fetchComedyAnime),
                    axios.get(requests.fetchSciFiAnime),
                    axios.get(requests.fetchRecentlyAiringAnime),

                ]);

                const trending = trendingRes.data.results || [];

                setTrendingAnime(trending);
                setPopularAnime(popularRes.data.results || []);
                setTopRatedAnime(topRatedRes.data.results || []);
                setActionAnime(actionRes.data.results || []);
                setFantasyAnime(fantasyRes.data.results || []);
                setRomanceAnime(romanceRes.data.results || []);
                setComedyAnime(comedyRes.data.results || []);
                setSciFiAnime(sciFiRes.data.results || []);
                setRecentAnime(recentRes.data.results || []);

                //-------------------------------------------------
                // Random Banner
                //-------------------------------------------------

                if (trending.length > 0) {

                    const randomAnime =
                        trending[
                            Math.floor(
                                Math.random() * trending.length
                            )
                        ];

                    setSelectedAnime(randomAnime);

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

                        setSelectedAnime(random);

                    }, 5000);

                }

            } catch (error) {

                console.error(
                    "Error fetching anime:",
                    error
                );

            }

        };

        fetchAnime();

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

        <div className="anime">

            <Banner movie={selectedAnime} />

            <Row
                title="Trending Anime"
                movies={trendingAnime}
            />

            <Row
                title="Popular Anime"
                movies={popularAnime}
            />

            <Row
                title="Top Rated Anime"
                movies={topRatedAnime}
            />

            <Row
                title="Action & Adventure"
                movies={actionAnime}
            />

            <Row
                title="Fantasy"
                movies={fantasyAnime}
            />

            <Row
                title="Romance"
                movies={romanceAnime}
            />

            <Row
                title="Comedy"
                movies={comedyAnime}
            />

            <Row
                title="Sci-Fi"
                movies={sciFiAnime}
            />

            <Row
                title="Recently Airing"
                movies={recentAnime}
            />

        </div>

    );

}

export default Anime;