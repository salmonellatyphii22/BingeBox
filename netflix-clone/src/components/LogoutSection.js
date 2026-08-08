import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

function LogoutSection({ onLogout }) {

    return (

        <section className="settings-section">

            <h2 className="settings-title">

                🚪 Logout

            </h2>

            <div className="settings-card">

                <p className="settings-description">

                    Sign out from your Netflix Clone account on this device.

                </p>

                <button

                    className="logout-btn"

                    onClick={onLogout}

                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </section>

    );

}

export default LogoutSection;