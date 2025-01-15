import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import { Header } from "../../components";
import { deleteCookie } from "../../utils/cookies";

export const UProfile = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newAddress, setNewAddress] = useState(user && user.address ? user.address : "");

  const navigate = useNavigate();

  const handleAddressUpdate = async () => {
    // Replace the fetch URL if needed
    const response = await fetch("http://localhost:8080/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update",
        email: user.email,
        address: newAddress // comment: user can modify the field name
      }),
    });
    if (response.ok) {
      // On success, you could reload the page or show a success message
      alert("Address updated successfully!");
    } else {
      alert("Failed to update address.");
    }
  };

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
            <div className="profile-row">
                <strong className="userAttrType">Name: </strong> 
                <span className="userAttrValue">{user.name}</span>
            </div>
            {!isEditing ? (
              <div className="profile-row">
                <strong className="userAttrType">Address: </strong>
                <span className="userAttrValue">{user.address}</span>
                <span className="pencil-icon" onClick={() => setIsEditing(true)}>✏️</span>
              </div>
            ) : (
              <>
                <label htmlFor="addressInput">Update Address</label>
                <input
                  id="addressInput"
                  type="text"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
                <button onClick={handleAddressUpdate}>Save Address</button>
              </>
            )}
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
