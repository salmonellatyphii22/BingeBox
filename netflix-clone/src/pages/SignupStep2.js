import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Login.css";

function SignupStep2() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Prevent direct access to Step 2
  if (!state?.email) {
    navigate("/signup");
    return null;
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create Firebase Authentication user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        password
      );

      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        plan: "free",
        isSubscribed: false,
        createdAt: new Date(),
      });

      // Redirect to Login page
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Account already exists or password is too weak.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="loginPage">
    <div className="login">
      <form
        className="loginForm"
        onSubmit={handleSignup}
      >
        <h1>Create Password</h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          minLength={6}
        />

        {error && (
          <p className="loginError">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>
      </form>
    </div>
  </div>
);
}

export default SignupStep2;