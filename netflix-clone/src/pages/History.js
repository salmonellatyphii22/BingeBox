import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { auth } from "../firebase";

import HistoryBanner from "../components/HistoryBanner";
import ContinueWatching from "../components/ContinueWatching";
import SearchHistory from "../components/SearchHistory";
import HistoryGrid from "../components/HistoryGrid";

import "./History.css";

const API_BASE = "http://127.0.0.1:8000";

function History() {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [continueWatching, setContinueWatching] = useState([]);

    //-----------------------------------------------------
    // Fetch Watch History
    //-----------------------------------------------------

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            if (!auth.currentUser) return;

            const token =
                await auth.currentUser.getIdToken();

            const res = await axios.get(
                `${API_BASE}/history/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const movies = res.data || [];

            setHistory(movies);

            //-----------------------------------------
            // Continue Watching
            //-----------------------------------------

            const continueMovies = movies.filter(
                (movie) =>
                    movie.progress > 0 &&
                    movie.progress < 100
            );

            setContinueWatching(continueMovies);

        } catch (err) {

            console.error("History Error:", err);

        } finally {

            setLoading(false);

        }

    };

    //-----------------------------------------------------
    // Search Filter
    //-----------------------------------------------------

    const filteredHistory = useMemo(() => {

        if (!search.trim()) {

            return history;

        }

        return history.filter((movie) =>

            (movie.title || movie.name || "")
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [history, search]);

    //-----------------------------------------------------

    if (loading) {

        return (

            <div className="history-loading">

                Loading Watch History...

            </div>

        );

    }

    //-----------------------------------------------------

    return (

        <div className="history">

            {/* Hero Banner */}

            <HistoryBanner
                movie={history[0]}
            />

            {/* Continue Watching */}

            <ContinueWatching
                movies={continueWatching}
            />

            {/* Search */}

            <div className="history-toolbar">

                <SearchHistory
                    value={search}
                    onChange={setSearch}
                />

            </div>

            {/* History Grid */}

            <HistoryGrid
                movies={filteredHistory}
                refreshHistory={fetchHistory}
            />

        </div>

    );

}

export default History;