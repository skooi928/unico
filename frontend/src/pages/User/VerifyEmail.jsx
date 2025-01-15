import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { deleteCookie, setCookie } from "../../utils/cookies";
import "./VerifyEmail.css";

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = searchParams.get("token");
      console.log("Verifying token:", token); // Debug log
      try {
        const response = await fetch("http://localhost:8080/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "verify",
            verificationToken: token,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          if (data.user) {
            if (data.user.email) {
              setCookie("email", data.user.email);
              console.log("Email cookie set:", data.user.email); // Debug log
            }

            if (data.user.password) {
              setCookie("password", data.user.password);
              console.log("Password cookie set:", data.user.password); // Debug log
            }
          }

          setStatus(
            "Email verified successfully! Redirecting to User Profile..."
          );
          setTimeout(() => navigate("/profile"), 2000);
        } else {
          setStatus(data.error || "Verification failed");
        }
      } catch (err) {
        setStatus("Verification failed");
      }
    };

    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div className="verify-email">
      <h1>Email Verification</h1>
      <p>{status}</p>
    </div>
  );
};

export default VerifyEmail;
