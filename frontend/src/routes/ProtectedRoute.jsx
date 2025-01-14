import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookies";
import { LoadingSpinner } from "../components";

export default function ProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    const email = getCookie("email");
    const password = getCookie("password");

    if (!token || !email || !password) {
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
          email,
          password
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            throw new Error(data.error);
          }
          setIsAllowed(true);
          setUserData(data.user);
        })
        .catch(() => setIsAllowed(false));
    }, []);

  if (isAllowed === null) {
    // Loading state
    return <LoadingSpinner />;
  }
  if (!isAllowed) {
    return <Navigate to="/login" replace />;
  }
  return React.cloneElement(children, { user: userData });
}