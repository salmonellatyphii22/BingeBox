import React from "react";
import { FaSearch } from "react-icons/fa";

function SearchHistory({
  value,
  onChange,
}) {

  return (

    <div className="history-search">

      <FaSearch className="history-search-icon" />

      <input
        type="text"
        placeholder="Search your watch history..."
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="history-search-input"
      />

      {value && (

        <button
          className="history-search-clear"
          onClick={() => onChange("")}
        >
          ✕
        </button>

      )}

    </div>

  );
}

export default SearchHistory;