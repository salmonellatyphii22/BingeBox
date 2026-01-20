import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Row from "../components/Row";
import axios from "../api/axios";
import requests from "../api/requests";
import "./Home.css"; // ⬅️ IMPORTANT

function Home() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [romanceMovies, setRomanceMovies] = useState([]);

  useEffect(() => {
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

        setTrending(trendingRes.data.results);
        setTopRated(topRatedRes.data.results);
        setActionMovies(actionRes.data.results);
        setComedyMovies(comedyRes.data.results);
        setHorrorMovies(horrorRes.data.results);
        setRomanceMovies(romanceRes.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="home">
      <Banner />

      <Row title="Trending Now" movies={trending} isLargeRow />
      <Row title="Top Rated" movies={topRated} />
      <Row title="Action Movies" movies={actionMovies} />
      <Row title="Comedy Movies" movies={comedyMovies} />
      <Row title="Horror Movies" movies={horrorMovies} />
      <Row title="Romance Movies" movies={romanceMovies} />
    </div>
  );
}

export default Home;
