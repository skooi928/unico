import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookies";

export default function ProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    const username = getCookie("username");
    const password = getCookie("password");

    if (!token || !username || !password) {
        setIsAllowed(false);
        return;
      }

    // Check with /user servlet
    fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          username,
          password
        })
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error("Not authorized");
        })
        .then(() => setIsAllowed(true))
        .catch(() => setIsAllowed(false));
    }, []);

  if (isAllowed === null) {
    // Loading state
    return <div>Checking authorization...</div>;
  }
  if (!isAllowed) {
    return <Navigate to="/userlogin" replace />;
  }
  return children;
}