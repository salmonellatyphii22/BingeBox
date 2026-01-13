import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <>
          <Navbar />
          <Home />
        </>
      )}
    </div>
  );
}

export function Header() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/login")}>
      <h3>Sign in</h3>
    </button>
  );
}

export default App;
