import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

function Login({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      navigate("/", { replace: true });
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        default:
          setError("Unable to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
  try {
    await signOut(auth); // 🚨 REQUIRED

    const result = await signInWithPopup(auth, provider);
    console.log(result.user.email);

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="loginPage">
      <div className="login">
        <form onSubmit={handleLogin} className="loginForm">
          <h1>Sign In</h1>

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

          {error && <p className="loginError">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <button
            type="button"
            className="googleBtn"
            onClick={handleGoogleLogin}
            disabled={loading}
              >
            Continue with Google
          </button>

          <div className="loginHelp">
            <span>
              New to MovieFlix?{" "}
              <Link to="/signup" className="signupLink">
                Sign up now
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
