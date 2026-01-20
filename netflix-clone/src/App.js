import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";
import Login from "./pages/Login";
import SignupStep1 from "./pages/SignupStep1";
import SignupStep2 from "./pages/SignupStep2";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Keep user logged in after refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  return (
  <Routes>
    {/* ✅ Login */}
    <Route
      path="/login"
      element={
        user ? <Navigate to="/" replace /> : <Login setUser={setUser} />
      }
    />

    {/* ✅ Signup Step 1 (Email) */}
    <Route
      path="/signup"
      element={
        user ? <Navigate to="/" replace /> : <SignupStep1 />
      }
    />

    {/* ✅ Signup Step 2 (Password) */}
    <Route
      path="/signup/password"
      element={
        user ? <Navigate to="/" replace /> : <SignupStep2 />
      }
    />

    {/* ✅ Protected Home */}
    <Route
      path="/"
      element={
        <ProtectedRoute user={user}>
          <>
            <Navbar />
            <Home />
          </>
        </ProtectedRoute>
      }
    />

    {/* ✅ Fallback */}
    <Route
      path="*"
      element={<Navigate to={user ? "/" : "/login"} replace />}
    />
  </Routes>
);
}

export default App;
