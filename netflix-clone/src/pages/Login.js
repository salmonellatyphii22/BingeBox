import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Login.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="login">
      <div className="login__overlay">
        <div className="login__box">
          <h1>Sign In</h1>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit">Sign In</button>

            <div className="login__options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <span>Need help?</span>
            </div>
          </form>

          <p className="signup">
            New to MovieFlix? <span>Sign up now</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
