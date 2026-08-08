import React from "react";
import {
    FaCrown,
    FaCheckCircle,
    FaEnvelope,
    FaCalendarAlt,
    FaEdit,
} from "react-icons/fa";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function ProfileHero({ profile }) {

    if (!profile) return null;

    return (

        <section
            className="profile-hero"
            style={{
                backgroundImage: profile.backdrop_path
                    ? `linear-gradient(to top,
                        rgba(17,17,17,.98),
                        rgba(17,17,17,.45)),
                        url(${IMAGE_BASE}${profile.backdrop_path})`
                    : undefined,
            }}
        >

            <div className="profile-hero-overlay">

                <div className="profile-avatar">

                    {profile.photoURL ? (

                        <img
                            src={profile.photoURL}
                            alt={profile.name}
                        />

                    ) : (

                        <div className="avatar-placeholder">

                            {profile.name?.charAt(0)}

                        </div>

                    )}

                </div>

                <div className="profile-details">

                    <div className="profile-name-row">

                        <h1>

                            {profile.name}

                        </h1>

                        {profile.email_verified && (

                            <span className="verified-badge">

                                <FaCheckCircle />

                                Verified

                            </span>

                        )}

                    </div>

                    <div className="profile-meta">

                        <div>

                            <FaEnvelope />

                            <span>

                                {profile.email}

                            </span>

                        </div>

                        <div>

                            <FaCalendarAlt />

                            <span>

                                Member Since{" "}

                                {profile.member_since ||
                                    "August 2026"}

                            </span>

                        </div>

                        <div>

                            <FaCrown />

                            <span>

                                {profile.plan || "Free Plan"}

                            </span>

                        </div>

                    </div>

                    <div className="profile-actions">

                        <button className="profile-edit-btn">

                            <FaEdit />

                            Edit Profile

                        </button>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default ProfileHero;