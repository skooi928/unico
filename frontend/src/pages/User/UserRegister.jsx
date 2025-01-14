import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./UserRegister.css";

export const URegis = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch("http://localhost:8080/api/user", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  action: "register",
                  email,
                  password
              }),
          });
  
          const data = await response.json();
        console.log('Server response:', data); // Debug log

        if (response.ok) {
            if (data.message && data.message.includes("verify")) {
                alert(data.message);
                navigate("/login");
            } else {
                alert("Registration successful!");
                navigate("/login");
            }
        } else if (data.error === "Failed to send verification email") {
            setError("Account created but verification email failed. Please contact support.");
        } else if (data.error === "Email already registered") {
            setError("This email is already registered.");
        } else {
            console.error('Registration error:', data.error); // Debug log
            setError(data.error || "Registration failed. Please try again.");
        }
      } catch (err) {
          console.error('Registration error:', err); // Debug log
          setError("Server error. Please try again later.");
      }
  };

    return (
        <div className="register-page">
            <Header/>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter a valid email"
                      required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit" onClick={handleSubmit} className="register-btn">Register</button>
            </form>
        </div>
    );
};

export default URegis;