import React from "react";

function AppearanceSettings({ settings, onChange }) {

    const colors = [
        "red",
        "blue",
        "purple",
        "green"
    ];

    return (

        <section className="settings-section">

            <h2 className="settings-title">

                🌙 Appearance

            </h2>

            <div className="settings-card">

                {/* Theme */}

                <div className="settings-row-column">

                    <h4>Theme</h4>

                    <div className="radio-group">

                        <label>

                            <input
                                type="radio"
                                name="appearance"
                                value="dark"
                                checked={settings.appearance === "dark"}
                                onChange={(e) =>
                                    onChange(
                                        "appearance",
                                        e.target.value
                                    )
                                }
                            />

                            🌙 Dark Mode

                        </label>

                        <label>

                            <input
                                type="radio"
                                name="appearance"
                                value="light"
                                checked={settings.appearance === "light"}
                                onChange={(e) =>
                                    onChange(
                                        "appearance",
                                        e.target.value
                                    )
                                }
                            />

                            ☀️ Light Mode

                        </label>

                    </div>

                </div>

                {/* Accent Color */}

                <div className="settings-row-column">

                    <h4>Accent Color</h4>

                    <div className="theme-colors">

                        {colors.map((color) => (

                            <button

                                key={color}

                                className={`theme-color-btn ${
                                    settings.accent_color === color
                                        ? "active"
                                        : ""
                                } ${color}`}

                                onClick={() =>
                                    onChange(
                                        "accent_color",
                                        color
                                    )
                                }

                                title={
                                    color.charAt(0).toUpperCase() +
                                    color.slice(1)
                                }

                            />

                        ))}

                    </div>

                </div>

            </div>

        </section>

    );

}

export default AppearanceSettings;