import React from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaGlobe,
  FaUserShield,
  FaCheckCircle,
} from "react-icons/fa";

function MemberInformation({ profile }) {
  return (
    <section className="profile-section">

      <div className="section-header">
        <h2>📅 Member Information</h2>
      </div>

      <div className="member-info-grid">

        {/* Joined */}

        <div className="member-card">

          <div className="member-icon">
            <FaCalendarAlt />
          </div>

          <div>

            <h4>Joined</h4>

            <p>
              {profile?.created_at
                ? new Date(
                    profile.created_at
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "August 2026"}
            </p>

          </div>

        </div>

        {/* Account Type */}

        <div className="member-card">

          <div className="member-icon">
            <FaUserShield />
          </div>

          <div>

            <h4>Account Type</h4>

            <p>
              {profile?.provider || "Google"}
            </p>

          </div>

        </div>

        {/* Email */}

        <div className="member-card">

          <div className="member-icon">
            <FaEnvelope />
          </div>

          <div>

            <h4>Email</h4>

            <p>
              {profile?.email}
            </p>

          </div>

        </div>

        {/* Email Verification */}

        <div className="member-card">

          <div className="member-icon">
            <FaCheckCircle />
          </div>

          <div>

            <h4>Email Verified</h4>

            <p>
              {profile?.email_verified
                ? "Yes"
                : "No"}
            </p>

          </div>

        </div>

        {/* Language */}

        <div className="member-card">

          <div className="member-icon">
            🌐
          </div>

          <div>

            <h4>Language</h4>

            <p>
              {profile?.language || "English"}
            </p>

          </div>

        </div>

        {/* Country */}

        <div className="member-card">

          <div className="member-icon">
            <FaGlobe />
          </div>

          <div>

            <h4>Country</h4>

            <p>
              {profile?.country || "India"}
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default MemberInformation;