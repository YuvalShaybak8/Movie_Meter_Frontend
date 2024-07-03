import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/MyProfile.css";

const MyProfile = () => {
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  return (
    <Layout>
      <div className="backgroundWrapper">
        <div className="myProfilePage">
          <h1>My Profile</h1>
          <div className="profileContent">
            <div className="profilePicture">
              {profileImage ? (
                <img
                  src={URL.createObjectURL(profileImage)}
                  alt="Profile"
                  className="profileImage"
                />
              ) : (
                <div
                  className="imagePlaceholder"
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  Upload Profile Picture
                </div>
              )}
              <input
                type="file"
                id="fileInput"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              <button
                className="uploadButton"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                Choose File
              </button>
            </div>
            <div className="userInfo">
              <div className="userInfoItem">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value="Current Username"
                  readOnly
                />
              </div>
              <div className="userInfoItem">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value="user@example.com"
                  readOnly
                />
              </div>
              <div className="userInfoItem">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value="******" readOnly />
              </div>
            </div>
          </div>
          <button className="updateButton">Update Your Profile</button>
        </div>
      </div>
    </Layout>
  );
};

export default MyProfile;
