import React from "react";
import {
    FaUserCircle,
    FaEnvelope,
    FaCrown,
    FaCalendarAlt,
    FaCheckCircle,
    FaEdit
} from "react-icons/fa";

function AccountSettings({ profile }) {

    return (

        <section className="settings-section">

            <h2 className="settings-title">

                👤 Account

            </h2>

            <div className="account-card">

                {/* Profile Image */}

                <div className="account-avatar">

                    {
                        profile?.photo_url ?

                        (

                            <img

                                src={profile.photo_url}

                                alt="Profile"

                            />

                        )

                        :

                        (

                            <FaUserCircle />

                        )

                    }

                </div>

                {/* Details */}

                <div className="account-details">

                    <div className="account-item">

                        <FaUserCircle className="account-icon" />

                        <div>

                            <span>Name</span>

                            <h4>

                                {profile?.name || "Netflix User"}

                            </h4>

                        </div>

                    </div>

                    <div className="account-item">

                        <FaEnvelope className="account-icon" />

                        <div>

                            <span>Email</span>

                            <h4>

                                {profile?.email}

                            </h4>

                        </div>

                    </div>

                    <div className="account-item">

                        <FaCrown className="account-icon" />

                        <div>

                            <span>Membership</span>

                            <h4>

                                {profile?.plan || "Premium"}

                            </h4>

                        </div>

                    </div>

                    <div className="account-item">

                        <FaCalendarAlt className="account-icon" />

                        <div>

                            <span>Member Since</span>

                            <h4>

                                {profile?.member_since || "August 2026"}

                            </h4>

                        </div>

                    </div>

                    <div className="account-item">

                        <FaCheckCircle className="account-icon verified" />

                        <div>

                            <span>Email Verified</span>

                            <h4>

                                {

                                    profile?.email_verified

                                    ?

                                    "Verified"

                                    :

                                    "Not Verified"

                                }

                            </h4>

                        </div>

                    </div>

                </div>

                {/* Edit Button */}

                <button

                    className="edit-profile-btn"

                >

                    <FaEdit />

                    Edit Profile

                </button>

            </div>

        </section>

    );

}

export default AccountSettings;