// The main page that combines Banner + Rows
import React from "react";
import Banner from "../components/Banner";
import Row from "../components/Row";
import requests from "../api/requests";

export default function Home() {
  return (
    <>
      <Banner />

      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLarge />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchAction} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedy} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorror} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomance} />
    </>
  );
}
