import React from "react";
import {
    FaExclamationTriangle,
    FaTrashAlt
} from "react-icons/fa";

function DangerZone({ onDelete }) {

    return (

        <section className="settings-section">

            <h2 className="settings-title danger-title">

                ⚠️ Danger Zone

            </h2>

            <div className="settings-card danger-card">

                <div className="danger-content">

                    <FaExclamationTriangle className="danger-icon" />

                    <div>

                        <h3>

                            Delete Account

                        </h3>

                        <p className="settings-description">

                            Permanently delete your account and all associated
                            data. This action cannot be undone.

                        </p>

                        <ul className="danger-list">

                            <li>User Profile</li>

                            <li>Watch History</li>

                            <li>My List</li>

                            <li>Ratings</li>

                            <li>Reviews</li>

                            <li>Playback Settings</li>

                            <li>Content Preferences</li>

                        </ul>

                    </div>

                </div>

                <button

                    className="delete-account-btn"

                    onClick={onDelete}

                >

                    <FaTrashAlt />

                    Delete Account

                </button>

            </div>

        </section>

    );

}

export default DangerZone;