import React from 'react';
import './Row.css';

export default function MovieCard({movie, isLarge}){
    return (
        <img
      className={`row-poster ${isLarge && "row-poster-large"}`}
      src={`https://image.tmdb.org/t/p/w500${
        isLarge ? movie.poster_path : movie.backdrop_path
      }`}
      alt={movie.name}
    />
    );
}