import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./Watch.css";

function Watch() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  // Replace this with your preferred YouTube video ID
  const VIDEO_ID = "dQw4w9WgXcQ";

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="watch">

      {/* Back Button */}
      <button
        className="watch-back"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        Back
      </button>

      {loading ? (
        <div className="watch-loading">
          <div className="watch-spinner"></div>
          <h2>Loading...</h2>
        </div>
      ) : (
        <iframe
          className="watch-player"
          src={`https://www.youtube.com/watch?v=0twHv5ARNmc&list=RD0twHv5ARNmc&start_radio=1`}
          title={`Movie ${id}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default Watch;