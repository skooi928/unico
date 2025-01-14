import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components";
import "./UserLogin.css";

export const ULogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch("http://localhost:8080/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "login",
        username,
        password,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      document.cookie = `username=${username}; path=/`;
      document.cookie = `password=${password}; path=/`;
      navigate("/userprofile");
    } else {
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="user-login">
      <Header />
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" onClick={handleSubmit}>Login</button>
      </form>
    </div>
  );
};

export default ULogin;