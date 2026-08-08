import React from "react";

function PlaybackSettings({ settings, onChange }) {

    return (

        <section className="settings-section">

            <h2 className="settings-title">

                ▶ Playback

            </h2>

            <div className="settings-card">

                {/* Autoplay Next Episode */}

                <div className="settings-row">

                    <div>

                        <h4>Autoplay Next Episode</h4>

                        <p>
                            Automatically play the next episode in a series.
                        </p>

                    </div>

                    <label className="switch">

                        <input
                            type="checkbox"
                            checked={settings.autoplay_next}
                            onChange={(e) =>
                                onChange(
                                    "autoplay_next",
                                    e.target.checked
                                )
                            }
                        />

                        <span className="slider"></span>

                    </label>

                </div>

                {/* Autoplay Preview */}

                <div className="settings-row">

                    <div>

                        <h4>Autoplay Previews</h4>

                        <p>
                            Play previews automatically while browsing.
                        </p>

                    </div>

                    <label className="switch">

                        <input
                            type="checkbox"
                            checked={settings.autoplay_preview}
                            onChange={(e) =>
                                onChange(
                                    "autoplay_preview",
                                    e.target.checked
                                )
                            }
                        />

                        <span className="slider"></span>

                    </label>

                </div>

                {/* Video Quality */}

                <div className="settings-row-column">

                    <h4>Video Quality</h4>

                    <div className="radio-group">

                        <label>

                            <input
                                type="radio"
                                name="quality"
                                value="Auto"
                                checked={
                                    settings.video_quality === "Auto"
                                }
                                onChange={(e) =>
                                    onChange(
                                        "video_quality",
                                        e.target.value
                                    )
                                }
                            />

                            Auto

                        </label>

                        <label>

                            <input
                                type="radio"
                                name="quality"
                                value="480p"
                                checked={
                                    settings.video_quality === "480p"
                                }
                                onChange={(e) =>
                                    onChange(
                                        "video_quality",
                                        e.target.value
                                    )
                                }
                            />

                            480p

                        </label>

                        <label>

                            <input
                                type="radio"
                                name="quality"
                                value="720p"
                                checked={
                                    settings.video_quality === "720p"
                                }
                                onChange={(e) =>
                                    onChange(
                                        "video_quality",
                                        e.target.value
                                    )
                                }
                            />

                            720p

                        </label>

                        <label>

                            <input
                                type="radio"
                                name="quality"
                                value="1080p"
                                checked={
                                    settings.video_quality === "1080p"
                                }
                                onChange={(e) =>
                                    onChange(
                                        "video_quality",
                                        e.target.value
                                    )
                                }
                            />

                            1080p

                        </label>

                    </div>

                </div>

                {/* Default Volume */}

                <div className="settings-row-column">

                    <h4>

                        Default Volume

                        <span
                            style={{
                                marginLeft: "10px",
                                color: "#e50914"
                            }}
                        >

                            {settings.default_volume}%

                        </span>

                    </h4>

                    <input
                        className="volume-slider"
                        type="range"
                        min="0"
                        max="100"
                        value={settings.default_volume}
                        onChange={(e) =>
                            onChange(
                                "default_volume",
                                Number(e.target.value)
                            )
                        }
                    />

                </div>

            </div>

        </section>

    );

}

export default PlaybackSettings;