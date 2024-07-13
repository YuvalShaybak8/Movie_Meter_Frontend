/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/MyProfile.css";
import { getUserById } from "../services/apiService";
import { useAuth } from "../Context/AuthContext";

const MyProfile = () => {
  const { user, setUser } = useAuth();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && user._id) {
        try {
          const userDetails = await getUserById(user._id);
          setUserData(userDetails);
          setUser(userDetails); // Update context with user data
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [user, setUser]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Display a loading state while fetching user data
  }

  console.log("User Data in MyProfile:", user);

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
              ) : user.profilePic ? (
                <img
                  src={user.profilePic}
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
                  value={user.username}
                  readOnly
                />
              </div>
              <div className="userInfoItem">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={user.email} readOnly />
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
