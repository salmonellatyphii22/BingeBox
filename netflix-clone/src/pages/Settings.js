import React, {
    useState,
    useEffect,
    useCallback
} from "react";

import axios from "axios";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import AccountSettings from "../components/AccountSettings";
import PlaybackSettings from "../components/PlaybackSettings";
import AppearanceSettings from "../components/AppearanceSettings";
import NotificationSettings from "../components/NotificationSettings";
import ContentPreferences from "../components/ContentPreferences";
import LogoutSection from "../components/LogoutSection";
import DangerZone from "../components/DangerZone";

import "./Settings.css";

const API_BASE = "http://127.0.0.1:8000";

function Settings() {

    const navigate = useNavigate();

    //-------------------------------------------------------
    // State
    //-------------------------------------------------------

    const [loading, setLoading] = useState(true);

    const [profile, setProfile] = useState(null);

    const [settings, setSettings] = useState({

        autoplay_next: true,

        autoplay_preview: true,

        video_quality: "1080p",

        default_volume: 70,

        appearance: "dark",

        accent_color: "red",

        email_notifications: true,

        new_releases: true,

        recommendations: true,

        watchlist_reminders: true,

        marketing_emails: false,

        preferred_genres: [
            "Action",
            "Anime",
            "Sci-Fi"
        ]

    });

    //-------------------------------------------------------
    // Firebase Token
    //-------------------------------------------------------

    const getToken = async () => {

        if (!auth.currentUser) return null;

        return await auth.currentUser.getIdToken();

    };

    //-------------------------------------------------------
    // Fetch Profile + Settings
    //-------------------------------------------------------

    const fetchSettings = useCallback(async () => {

        try {

            const token = await getToken();

            if (!token) {

                setLoading(false);

                return;

            }

            const headers = {

                Authorization: `Bearer ${token}`

            };

            const [

                profileRes,

                settingsRes

            ] = await Promise.all([

                axios.get(
                    `${API_BASE}/users/profile`,
                    { headers }
                ),

                axios.get(
                    `${API_BASE}/settings`,
                    { headers }
                )

            ]);

            setProfile(profileRes.data);

            if (settingsRes.data) {

                setSettings(settingsRes.data);

            }

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    }, []);

    //-------------------------------------------------------
    // Load
    //-------------------------------------------------------

    useEffect(() => {

        fetchSettings();

    }, [fetchSettings]);

    //-------------------------------------------------------
    // Update Local Setting
    //-------------------------------------------------------

    const updateSetting = (key, value) => {

        setSettings(prev => ({

            ...prev,

            [key]: value

        }));

    };

    //-------------------------------------------------------
    // Save Settings
    //-------------------------------------------------------

    const saveSettings = async () => {

        try {

            const token = await getToken();

            await axios.put(

                `${API_BASE}/settings`,

                settings,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("Settings Saved Successfully.");

        }

        catch (err) {

            console.error(err);

            alert("Unable to save settings.");

        }

    };

    //-------------------------------------------------------
    // Logout
    //-------------------------------------------------------

    const handleLogout = async () => {

        const ok = window.confirm(

            "Are you sure you want to logout?"

        );

        if (!ok) return;

        await signOut(auth);

        navigate("/login");

    };

    //-------------------------------------------------------
    // Delete Account
    //-------------------------------------------------------

    const handleDeleteAccount = async () => {

        const ok = window.confirm(

            "This action cannot be undone.\n\nDelete Account?"

        );

        if (!ok) return;

        try {

            const token = await getToken();

            await axios.delete(

                `${API_BASE}/users/delete`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            await signOut(auth);

            navigate("/login");

        }

        catch (err) {

            console.error(err);

            alert("Unable to delete account.");

        }

    };

    //-------------------------------------------------------
    // Loading
    //-------------------------------------------------------

    if (loading) {

        return (

            <div className="settings-loading">

                Loading Settings...

            </div>

        );

    }

    //-------------------------------------------------------
    // UI
    //-------------------------------------------------------

    return (

        <div className="settings">

            {/* Account */}

            <AccountSettings

                profile={profile}

                onSave={saveSettings}

            />

            {/* Playback */}

            <PlaybackSettings

                settings={settings}

                onChange={updateSetting}

            />

            {/* Appearance */}

            <AppearanceSettings

                settings={settings}

                onChange={updateSetting}

            />

            {/* Notifications */}

            <NotificationSettings

                settings={settings}

                onChange={updateSetting}

            />

            {/* Content Preferences */}

            <ContentPreferences

                settings={settings}

                onChange={updateSetting}

            />

            {/* Save Button */}

            <div className="settings-save-container">

                <button

                    className="settings-save-btn"

                    onClick={saveSettings}

                >

                    Save Changes

                </button>

            </div>

            {/* Logout */}

            <LogoutSection

                onLogout={handleLogout}

            />

            {/* Danger Zone */}

            <DangerZone

                onDelete={handleDeleteAccount}

            />

        </div>

    );

}

export default Settings;