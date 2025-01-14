import React from "react";
import "./UserProfile.css";
import { Header } from "../../components";

export const UProfile = ({ user }) => {
    return (
      <div className="user-profile">
        <Header/>
        <h1>Profile</h1>
        {user && (
          <div>
            <p>Email: {user.email}</p>
            {/* Add more user details as needed */}
          </div>
        )}
      </div>
    );
  };
  
  export default UProfile;