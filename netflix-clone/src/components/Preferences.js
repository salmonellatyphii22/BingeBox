import React from "react";
import {
  FaMoon,
  FaLanguage,
  FaPlayCircle,
  FaVideo,
  FaCog,
} from "react-icons/fa";

function Preferences({ settings }) {
  return (
    <section className="profile-section">

      <div className="section-header">
        <h2>
          <FaCog />
          &nbsp; Preferences
        </h2>
      </div>

      <div className="preferences-grid">

        {/* Theme */}

        <div className="preference-card">

          <div className="preference-icon">
            <FaMoon />
          </div>

          <div className="preference-info">

            <h4>Theme</h4>

            <p>
              {settings?.theme || "Dark"}
            </p>

          </div>

        </div>

        {/* Language */}

        <div className="preference-card">

          <div className="preference-icon">
            <FaLanguage />
          </div>

          <div className="preference-info">

            <h4>Language</h4>

            <p>
              {settings?.language || "English"}
            </p>

          </div>

        </div>

        {/* Autoplay */}

        <div className="preference-card">

          <div className="preference-icon">
            <FaPlayCircle />
          </div>

          <div className="preference-info">

            <h4>Autoplay</h4>

            <p>
              {settings?.autoplay
                ? "ON"
                : "OFF"}
            </p>

          </div>

        </div>

        {/* Video Quality */}

        <div className="preference-card">

          <div className="preference-icon">
            <FaVideo />
          </div>

          <div className="preference-info">

            <h4>Video Quality</h4>

            <p>
              {settings?.video_quality ||
                "1080p"}
            </p>

          </div>

        </div>

      </div>

      <div className="preferences-note">

        <p>
          These preferences are read-only on your profile.
          You can modify them from the <strong>Settings</strong> page.
        </p>

      </div>

    </section>
  );
}

export default Preferences;