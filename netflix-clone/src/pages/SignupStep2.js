import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useLocation, useNavigate } from "react-router-dom";

function SignupStep2() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Prevent direct access to step 2
  if (!state?.email) {
    navigate("/signup");
    return null;
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        state.email,
        password
      );

      const user = userCredential.user;

      // 2️⃣ Store subscription status in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        plan: "free",          // 👈 subscription status
        isSubscribed: false,   // optional but useful
        createdAt: new Date()
      });

      // 3️⃣ Redirect to login (Netflix behavior)
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Account already exists or password too weak");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSignup} className="loginForm">
        <h1>Create a password</h1>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />

        {error && <p className="loginError">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}

export default SignupStep2;
