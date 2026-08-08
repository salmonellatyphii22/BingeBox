import React, { useEffect, useState } from "react";
import TVBanner from "../components/TVBanner";
import Row from "../components/Row";

import axios from "../api/axios";
import requests from "../api/requests";

import "./TVShows.css";

function TVShows() {

    const [continueWatching, setContinueWatching] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [topRatedTV, setTopRatedTV] = useState([]);
    const [netflixOriginals, setNetflixOriginals] = useState([]);
    const [crimeTV, setCrimeTV] = useState([]);
    const [comedyTV, setComedyTV] = useState([]);
    const [sciFiTV, setSciFiTV] = useState([]);
    const [recentTV, setRecentTV] = useState([]);

    //-------------------------------------------------------
    // Fetch TV Shows
    //-------------------------------------------------------

    useEffect(() => {

        const fetchTVShows = async () => {

            try {

                const [

                    continueRes,
                    popularRes,
                    topRatedRes,
                    originalsRes,
                    crimeRes,
                    comedyRes,
                    sciFiRes,
                    recentRes,

                ] = await Promise.all([

                    axios.get(requests.fetchContinueWatchingTV),
                    axios.get(requests.fetchPopularTV),
                    axios.get(requests.fetchTopRatedTV),
                    axios.get(requests.fetchNetflixOriginalsTV),
                    axios.get(requests.fetchCrimeTV),
                    axios.get(requests.fetchComedyTV),
                    axios.get(requests.fetchSciFiTV),
                    axios.get(requests.fetchRecentlyAddedTV),

                ]);

                setContinueWatching(
                    continueRes.data.results || []
                );

                setPopularTV(
                    popularRes.data.results || []
                );

                setTopRatedTV(
                    topRatedRes.data.results || []
                );

                setNetflixOriginals(
                    originalsRes.data.results || []
                );

                setCrimeTV(
                    crimeRes.data.results || []
                );

                setComedyTV(
                    comedyRes.data.results || []
                );

                setSciFiTV(
                    sciFiRes.data.results || []
                );

                setRecentTV(
                    recentRes.data.results || []
                );

            } catch (error) {

                console.error(
                    "Error fetching TV shows:",
                    error
                );

            }

        };

        fetchTVShows();

    }, []);

    //-------------------------------------------------------

    return (

        <div className="tvshows">

            <TVBanner
                fetchUrl={requests.fetchPopularTV}
            />

            <Row
                title="Continue Watching"
                movies={continueWatching}
            />

            <Row
                title="Popular TV Shows"
                movies={popularTV}
            />

            <Row
                title="Top Rated"
                movies={topRatedTV}
            />

            <Row
                title="Netflix Originals"
                movies={netflixOriginals}
            />

            <Row
                title="Crime"
                movies={crimeTV}
            />

            <Row
                title="Comedy"
                movies={comedyTV}
            />

            <Row
                title="Sci-Fi"
                movies={sciFiTV}
            />

            <Row
                title="Recently Added"
                movies={recentTV}
            />

        </div>

    );

}

export default TVShows;