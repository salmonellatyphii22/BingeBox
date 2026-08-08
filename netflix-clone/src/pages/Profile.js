import React, {
    useEffect,
    useState,
    useCallback
} from "react";
import axios from "axios";

import { auth } from "../firebase";

import ProfileHero from "../components/ProfileHero";
import StatisticsCards from "../components/StatisticsCards";
import ContinueWatchingPreview from "../components/ContinueWatchingPreview";
import FavoriteGenres from "../components/FavoriteGenres";
import RatingsPreview from "../components/RatingsPreview";
import ReviewsPreview from "../components/ReviewsPreview";
import MyListPreview from "../components/MyListPreview";
import WatchHistoryPreview from "../components/WatchHistoryPreview";
import MemberInformation from "../components/MemberInformation";
import Preferences from "../components/Preferences";

import "./Profile.css";

const API_BASE = "http://127.0.0.1:8000";

function Profile() {

    const [loading, setLoading] = useState(true);

    const [profile, setProfile] = useState(null);

    const [stats, setStats] = useState(null);

    const [continueWatching, setContinueWatching] = useState([]);

    const [ratings, setRatings] = useState([]);

    const [reviews, setReviews] = useState([]);

    const [myList, setMyList] = useState([]);

    const [recentHistory, setRecentHistory] = useState([]);

    const [settings, setSettings] = useState(null);

    const [favoriteGenres, setFavoriteGenres] = useState([]);

    //--------------------------------------------------------
    // Get Firebase Token
    //--------------------------------------------------------

    const getToken = async () => {

        if (!auth.currentUser) return null;

        return await auth.currentUser.getIdToken();

    };

    //--------------------------------------------------------
    // Fetch Profile Data
    //--------------------------------------------------------

    //--------------------------------------------------------
// Fetch Profile Data
//--------------------------------------------------------

const fetchProfile = useCallback(async () => {
    try {
        const token = await getToken();

        if (!token) {
            setLoading(false);
            return;
        }

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const [
            profileRes,
            historyRes,
            myListRes,
            reviewsRes,
            settingsRes,
        ] = await Promise.all([
            axios.get(`${API_BASE}/users/profile`, { headers }),
            axios.get(`${API_BASE}/history/`, { headers }),
            axios.get(`${API_BASE}/mylist/`, { headers }),
            axios.get(`${API_BASE}/reviews/`, { headers }),
            axios.get(`${API_BASE}/settings/`, { headers }),
        ]);

        const history = historyRes.data || [];
        const myListData = myListRes.data || [];
        const reviewsData = reviewsRes.data || [];

        //--------------------------------------------------------
        // Profile
        //--------------------------------------------------------

        setProfile(profileRes.data);

        //--------------------------------------------------------
        // My List
        //--------------------------------------------------------

        setMyList(myListData);

        //--------------------------------------------------------
        // Watch History
        //--------------------------------------------------------

        setRecentHistory(history);

        //--------------------------------------------------------
        // Continue Watching
        //--------------------------------------------------------

        const continueWatchingMovies = history
            .filter(
                (movie) =>
                    movie.progress !== undefined &&
                    movie.progress > 0 &&
                    movie.progress < 100
            )
            .slice(0, 6);

        setContinueWatching(continueWatchingMovies);

        //--------------------------------------------------------
        // Reviews
        //--------------------------------------------------------

        setReviews(reviewsData.slice(0, 6));

        //--------------------------------------------------------
        // Ratings
        //--------------------------------------------------------

        const ratingsData = reviewsData
            .filter((review) => review.rating != null)
            .map((review) => ({
                ...review,
                movie_id: review.movie_id,
                title: review.title,
                poster_path: review.poster_path,
                rating: review.rating,
            }));

        setRatings(ratingsData);

        //--------------------------------------------------------
        // Favorite Genres
        //--------------------------------------------------------

        const genreMap = {};

        history.forEach((movie) => {
            if (!movie.genres) return;

            movie.genres.forEach((genre) => {
                genreMap[genre] = (genreMap[genre] || 0) + 1;
            });
        });

        const topGenres = Object.entries(genreMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6)
            .map(([genre]) => ({
                name: genre,
                count: genreMap[genre],
            }));

        setFavoriteGenres(topGenres);

        //--------------------------------------------------------
        // Statistics
        //--------------------------------------------------------

        const averageRating =
            reviewsData.length > 0
                ? (
                      reviewsData.reduce(
                          (sum, review) => sum + (review.rating || 0),
                          0
                      ) / reviewsData.length
                  ).toFixed(1)
                : "0.0";

        setStats({
            totalWatched: history.length,
            totalMyList: myListData.length,
            totalReviews: reviewsData.length,
            averageRating,
        });

        //--------------------------------------------------------
        // Settings
        //--------------------------------------------------------

        setSettings(settingsRes.data);
    } catch (err) {
        console.error("Profile Fetch Error:", err);
    } finally {
        setLoading(false);
    }
}, []);

    //--------------------------------------------------------
    // Load on Mount
    //--------------------------------------------------------

    useEffect(() => {

        fetchProfile();

    }, [fetchProfile]);

    //--------------------------------------------------------
    // Loading
    //--------------------------------------------------------

    if (loading) {

        return (

            <div className="profile-loading">

                Loading Profile...

            </div>

        );

    }

    //--------------------------------------------------------
    // UI
    //--------------------------------------------------------

    return (

        <div className="profile">

            <ProfileHero
                profile={profile}
            />

            <StatisticsCards
                stats={stats}
            />

            <ContinueWatchingPreview
                movies={continueWatching}
            />

            <FavoriteGenres
                genres={favoriteGenres}
                profile={profile}
            />

            <RatingsPreview
                ratings={ratings}
            />

            <ReviewsPreview
                reviews={reviews}
            />

            <MyListPreview
                movies={myList}
            />

            <WatchHistoryPreview
                history={recentHistory}
            />

            <MemberInformation
                profile={profile}
            />

            <Preferences
                settings={settings}
            />

        </div>

    );

}

export default Profile;