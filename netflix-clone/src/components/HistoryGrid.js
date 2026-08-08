import React from "react";
import HistoryCard from "./HistoryCard";

function HistoryGrid({
  movies = [],
  refreshHistory,
}) {

  if (!movies.length) {
    return (

      <div className="history-empty">

        <h2>No Watch History</h2>

        <p>
          Start watching movies and TV shows to
          build your watch history.
        </p>

      </div>

    );
  }

  return (

    <section className="history-grid-section">

      <div className="history-grid-header">

        <h2>
          Watch History
        </h2>

        <span>
          {movies.length}
          {" "}
          {movies.length === 1
            ? "Title"
            : "Titles"}
        </span>

      </div>

      <div className="history-grid">

        {movies.map((movie) => (

          <HistoryCard
            key={
              movie.movie_id ||
              movie.id
            }
            movie={movie}
            refreshHistory={refreshHistory}
          />

        ))}

      </div>

    </section>

  );
}

export default HistoryGrid;