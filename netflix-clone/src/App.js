import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";

import Login from "./pages/Login";
import SignupStep1 from "./pages/SignupStep1";
import SignupStep2 from "./pages/SignupStep2";

import Home from "./pages/Home";
import Search from "./pages/Search";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import Anime from "./pages/Anime";
import MyList from "./pages/MyList";
import Watch from "./pages/Watch"; // <-- NEW

// Create these pages later
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div style={{ color: "white" }}>
        Loading...
      </div>
    );
  }

  return (
    <Routes>

      {/* Login */}
      <Route
        path="/login"
        element={
          user
            ? <Navigate to="/" replace />
            : <Login setUser={setUser} />
        }
      />

      {/* Signup Step 1 */}
      <Route
        path="/signup"
        element={
          user
            ? <Navigate to="/" replace />
            : <SignupStep1 />
        }
      />

      {/* Signup Step 2 */}
      <Route
        path="/signup/password"
        element={
          user
            ? <Navigate to="/" replace />
            : <SignupStep2 />
        }
      />

      {/* Home */}
      <Route
        path="/"
        element={
          <ProtectedRoute user={user}>
            <>
              <Sidebar />
              <Navbar />
              <Home />
            </>
          </ProtectedRoute>
        }
      />

      {/* Search */}
      <Route
        path="/search"
        element={
          <ProtectedRoute user={user}>
            <>
              <Sidebar />
              <Navbar />
              <Search />
            </>
          </ProtectedRoute>
        }
      />

      {/* TV Shows */}
      <Route
        path="/tv"
        element={
          <ProtectedRoute user={user}>
            <>
              <Sidebar />
              <Navbar />
              <TVShows />
            </>
          </ProtectedRoute>
        }
      />

      {/* Movies */}
      <Route
        path="/movies"
        element={
          <ProtectedRoute user={user}>
            <>
              <Sidebar />
              <Navbar />
              <Movies />
            </>
          </ProtectedRoute>
        }
      />

      {/* Anime */}
      <Route
        path="/anime"
        element={
          <ProtectedRoute user={user}>
            <>
              <Sidebar />
              <Navbar />
              <Anime />
            </>
          </ProtectedRoute>
        }
      />

      {/* My List */}
      <Route
        path="/mylist"
        element={
          <ProtectedRoute user={user}>
            <>
              <Sidebar />
              <Navbar />
              <MyList />
            </>
          </ProtectedRoute>
        }
      />

      {/* Watch History */}
      <Route
        path="/history"
        element={
          <ProtectedRoute user={user}>
            <>
              <Sidebar />
              <Navbar />
              <History />
            </>
          </ProtectedRoute>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute user={user}>
            <>
              <Sidebar />
              <Navbar />
              <Profile />
            </>
          </ProtectedRoute>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute user={user}>
            <>
              <Sidebar />
              <Navbar />
              <Settings />
            </>
          </ProtectedRoute>
        }
      />

      {/* Watch Player */}
      <Route
        path="/watch/:id"
        element={
          <ProtectedRoute user={user}>
            <Watch />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={
          <Navigate
            to={user ? "/" : "/login"}
            replace
          />
        }
      />

    </Routes>
  );
}

export default App;