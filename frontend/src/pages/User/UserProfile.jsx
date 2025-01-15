import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { Header } from "../../components";
import { deleteCookie } from "../../utils/cookies";

export const UProfile = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies
    deleteCookie("email");
    deleteCookie("password");
    // Clear localStorage
    localStorage.removeItem("token");
    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="user-profile">
      <Header />
      <div className="profile-container">
        <h1>Profile</h1>
        {user && (
          <div className="profile-details">
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {/* Add more user details as needed */}
          </div>
        )}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UProfile;
