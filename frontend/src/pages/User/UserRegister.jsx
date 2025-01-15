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
            <Header />
            <div className="register-container">
                <div className="register-form">
                    <h2>REGISTER</h2>
                    <p>Create an account with your email address and password.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">EMAIL ADDRESS *</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter a valid email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">PASSWORD *</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="form-links">
                            <a href="/terms">TERMS OF USE</a> | <a href="/privacy">PRIVACY POLICY</a>
                        </div>
                        <button type="submit" className="register-button">REGISTER</button>
                    </form>
                </div>
                <div className="create-account">
                    <h2>ALREADY HAVE AN ACCOUNT?</h2>
                    <p>
                        If you already have an account, log in to access your profile and complete your orders.
                    </p>
                    <a href="/login">
                        <button className="create-account-button">LOG IN</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default URegis;