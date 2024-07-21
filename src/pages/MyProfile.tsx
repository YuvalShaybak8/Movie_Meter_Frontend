import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/MyProfile.css";
import { useAuth } from "../Context/AuthContext";
import { getUserById, updateUser } from "../services/apiService";

const MyProfile = () => {
  const { user, setUser } = useAuth();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    profilePic: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user._id) {
        try {
          const fetchedUser = await getUserById(user._id);
          setUserData({
            username: fetchedUser.username,
            email: fetchedUser.email,
            profilePic: fetchedUser.profilePic,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, username: e.target.value });
  };

  const handleUpdateProfile = async () => {
    if (user && user._id) {
      try {
        const formData = new FormData();
        formData.append("username", userData.username);
        if (profileImage) {
          formData.append("profilePic", profileImage);
        }

        const updatedUser = await updateUser(user._id, formData);
        setUser(updatedUser);
        setUserData({
          ...userData,
          profilePic: updatedUser.profilePic,
        });
        setProfileImage(null);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <Layout>
      <div className="backgroundWrapper">
        <div className="myProfilePage">
          <h1>My Profile</h1>
          <div className="profileContent">
            <div className="profilePicture">
              <img
                src={
                  profileImage
                    ? URL.createObjectURL(profileImage)
                    : userData.profilePic
                    ? `${import.meta.env.VITE_REACT_APP_API_URL}/uploads/${
                        userData.profilePic
                      }`
                    : "/default-avatar.jpg"
                }
                alt="Profile"
                className="profileImage"
              />
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
                  value={userData.username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="userInfoItem">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={userData.email}
                  readOnly
                />
              </div>
              <div className="userInfoItem">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value="******" readOnly />
              </div>
            </div>
          </div>
          <button className="updateButton" onClick={handleUpdateProfile}>
            Update Your Profile
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MyProfile;
