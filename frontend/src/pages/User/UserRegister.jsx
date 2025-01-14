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
            if (response.ok) {
                navigate("/login");
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("Registration failed");
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