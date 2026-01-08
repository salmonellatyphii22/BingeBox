import React, {useEffect, useState} from "react";
import axios from "../api/axios";
import requests from "../api/requests";
import "Banner.css";

export default function Banner(){
    const [movie,setMovie]=useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request=await axios.get(requests.fetchTrencing);
            setMovie(
                request.data.results[
                    Math.floor(Math.random()*request.data.results.length-1)
                ]
            );
            return request;
        }
        fetchData();
    },[]);
    
    return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
        backgroundPosition: "center top",
      }}
    >
      <div className="banner-content">
        <h1>{movie?.title || movie?.name}</h1>
        <p className="description">{movie?.overview}</p>
        <button className="banner-btn">Play</button>
        <button className="banner-btn">More Info</button>
      </div>
      <div className="fade-bottom"></div>
    </header>
  );
}