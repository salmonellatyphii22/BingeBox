import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function SignupStep1() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    navigate("/signup/password", {
      state: { email },
    });
  };

  return (
    <div className="loginPage">
      <div className="login">
        <form className="loginForm" onSubmit={handleNext}>
          <h1>Create Account</h1>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupStep1;