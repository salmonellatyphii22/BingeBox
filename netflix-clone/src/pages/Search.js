import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import requests from "../api/requests";

import SearchBar from "../components/SearchBar";
import SearchSuggestions from "../components/SearchSuggestions";
import SearchResults from "../components/SearchResults";
import Row from "../components/Row";

import "./Search.css";

function Search() {
  const [query, setQuery] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);

  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [anime, setAnime] = useState([]);

  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Discovery Content
  useEffect(() => {
    async function fetchDiscovery() {
      try {
        const [
          trendingRes,
          topRatedRes,
          tvRes,
          animeRes,
        ] = await Promise.all([
          axios.get(requests.fetchTrending),
          axios.get(requests.fetchTopRated),
          axios.get(requests.fetchNetflixOriginals),
          axios.get(requests.fetchSearch("anime")),
        ]);

        setTrending(trendingRes.data.results || []);
        setTopRated(topRatedRes.data.results || []);
        setTvShows(tvRes.data.results || []);
        setAnime(animeRes.data.results || []);
      } catch (err) {
        console.log(err);
      }
    }

    fetchDiscovery();
  }, []);

  // Live Suggestions
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setResults([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await axios.get(requests.fetchSearch(query));

        setSuggestions(res.data.results.slice(0, 8));
        setShowSuggestions(true);
      } catch (err) {
        console.log(err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const res = await axios.get(requests.fetchSearch(query));

      setResults(res.data.results || []);

      setShowSuggestions(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (movie) => {
    setQuery(movie.title || movie.name);

    setResults(suggestions);

    setShowSuggestions(false);
  };

  return (
    <div className="search-page">

      <SearchBar
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
      />

      {showSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          onSelect={handleSuggestionClick}
        />
      )}

      {loading && (
        <div className="loading">
          Searching...
        </div>
      )}

      {!loading && results.length > 0 ? (
        <SearchResults
          query={query}
          results={results}
        />
      ) : (
        <>
          <section className="trending-searches">
            <h2>Trending Searches</h2>

            <div className="chips">
              {[
                "Naruto",
                "Wednesday",
                "Squid Game",
                "Money Heist",
                "Interstellar",
                "John Wick",
                "Avengers",
                "Demon Slayer",
              ].map((item) => (
                <button
                  key={item}
                  className="chip"
                  onClick={() => setQuery(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <Row
            title="Trending Today"
            movies={trending}
          />

          <Row
            title="Popular TV Shows"
            movies={tvShows}
          />

          <Row
            title="Top Rated"
            movies={topRated}
          />

          <Row
            title="Popular Anime"
            movies={anime}
          />
        </>
      )}

    </div>
  );
}

export default Search;