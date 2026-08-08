import React from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchSuggestions.css";

function SearchSuggestions({ suggestions, onSelect }) {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="suggestions-container">
      {suggestions.map((movie) => (
        <div
          key={movie.id}
          className="suggestion-item"
          onClick={() => onSelect(movie)}
        >
          <FaSearch className="suggestion-icon" />

          <span>
            {movie.title ||
              movie.name ||
              movie.original_name ||
              "Unknown"}
          </span>
        </div>
      ))}
    </div>
  );
}

export default SearchSuggestions;