import React from "react";

function NotificationSettings({ settings, onChange }) {

    return (

        <section className="settings-section">

            <h2 className="settings-title">

                🔔 Notifications

            </h2>

            <div className="settings-card">

                {/* Email Notifications */}

                <div className="settings-row">

                    <div>

                        <h4>Email Notifications</h4>

                        <p>
                            Receive important account updates via email.
                        </p>

                    </div>

                    <label className="switch">

                        <input
                            type="checkbox"
                            checked={settings.email_notifications}
                            onChange={(e) =>
                                onChange(
                                    "email_notifications",
                                    e.target.checked
                                )
                            }
                        />

                        <span className="slider"></span>

                    </label>

                </div>

                {/* New Releases */}

                <div className="settings-row">

                    <div>

                        <h4>New Releases</h4>

                        <p>
                            Notify me when new movies or TV shows are available.
                        </p>

                    </div>

                    <label className="switch">

                        <input
                            type="checkbox"
                            checked={settings.new_releases}
                            onChange={(e) =>
                                onChange(
                                    "new_releases",
                                    e.target.checked
                                )
                            }
                        />

                        <span className="slider"></span>

                    </label>

                </div>

                {/* Recommendations */}

                <div className="settings-row">

                    <div>

                        <h4>Recommendations</h4>

                        <p>
                            Get personalized recommendations based on your viewing activity.
                        </p>

                    </div>

                    <label className="switch">

                        <input
                            type="checkbox"
                            checked={settings.recommendations}
                            onChange={(e) =>
                                onChange(
                                    "recommendations",
                                    e.target.checked
                                )
                            }
                        />

                        <span className="slider"></span>

                    </label>

                </div>

                {/* Watchlist Reminders */}

                <div className="settings-row">

                    <div>

                        <h4>Watchlist Reminders</h4>

                        <p>
                            Receive reminders for titles saved in My List.
                        </p>

                    </div>

                    <label className="switch">

                        <input
                            type="checkbox"
                            checked={settings.watchlist_reminders}
                            onChange={(e) =>
                                onChange(
                                    "watchlist_reminders",
                                    e.target.checked
                                )
                            }
                        />

                        <span className="slider"></span>

                    </label>

                </div>

                {/* Marketing Emails */}

                <div className="settings-row">

                    <div>

                        <h4>Marketing Emails</h4>

                        <p>
                            Receive promotional offers, feature announcements and news.
                        </p>

                    </div>

                    <label className="switch">

                        <input
                            type="checkbox"
                            checked={settings.marketing_emails}
                            onChange={(e) =>
                                onChange(
                                    "marketing_emails",
                                    e.target.checked
                                )
                            }
                        />

                        <span className="slider"></span>

                    </label>

                </div>

            </div>

        </section>

    );

}

export default NotificationSettings;