// import React, { useState, useEffect } from "react";
// import Layout from "../components/Layout";
// import "../styles/MyProfile.css";
// import { useAuth } from "../Context/AuthContext";
// import { getUserById } from "../services/apiService";

// const MyProfile = () => {
//   const { user } = useAuth();
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const [userData, setUserData] = useState({
//     username: "",
//     email: "",
//     profilePic: "",
//   });

//   useEffect(() => {
//     console.log("Current user from AuthContext:", user);
//     const fetchUserData = async () => {
//       if (user && user._id) {
//         console.log("Fetching user data for ID:", user._id);
//         try {
//           const fetchedUser = await getUserById(user._id);
//           console.log("Fetched user info:", fetchedUser);
//           setUserData({
//             username: fetchedUser.username,
//             email: fetchedUser.email,
//             profilePic: fetchedUser.profilePic,
//           });
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       } else {
//         console.log("User or user._id is not available");
//       }
//     };

//     fetchUserData();
//   }, [user]);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setProfileImage(e.target.files[0]);
//     }
//   };

//   console.log("Current userData state:", userData);

//   if (!user) {
//     return <div>Loading user data...</div>;
//   }

//   return (
//     <Layout>
//       <div className="backgroundWrapper">
//         <div className="myProfilePage">
//           <h1>My Profile</h1>
//           <div className="profileContent">
//             <div className="profilePicture">
//               {profileImage ? (
//                 <img
//                   src={URL.createObjectURL(profileImage)}
//                   alt="Profile"
//                   className="profileImage"
//                 />
//               ) : userData.profilePic ? (
//                 <img
//                   src={userData.profilePic}
//                   alt="Profile"
//                   className="profileImage"
//                 />
//               ) : (
//                 <div
//                   className="imagePlaceholder"
//                   onClick={() => document.getElementById("fileInput")?.click()}
//                 >
//                   Upload Profile Picture
//                 </div>
//               )}
//               <input
//                 type="file"
//                 id="fileInput"
//                 onChange={handleImageUpload}
//                 style={{ display: "none" }}
//               />
//               <button
//                 className="uploadButton"
//                 onClick={() => document.getElementById("fileInput")?.click()}
//               >
//                 Choose File
//               </button>
//             </div>
//             <div className="userInfo">
//               <div className="userInfoItem">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   value={userData.username}
//                   readOnly
//                 />
//               </div>
//               <div className="userInfoItem">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   value={userData.email}
//                   readOnly
//                 />
//               </div>
//               <div className="userInfoItem">
//                 <label htmlFor="password">Password</label>
//                 <input type="password" id="password" value="******" readOnly />
//               </div>
//             </div>
//           </div>
//           <button className="updateButton">Update Your Profile</button>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default MyProfile;

import React, { useState } from 'react';
import { useAuth } from '../Context/AuthContext';
import '../styles/MyProfile.css';

const MyProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [message, setMessage] = useState('');

  const handleUpdate = async () => {
    console.log('Updating profile - frontend');
    try {
      const updatedUser = await updateUser({
        userId: user.id,
        username,
        password
      });
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  return (
    <div className="backgroundWrapper">
      <div className="myProfilePage">
        <h1>My Profile</h1>
        <div className="profileContent">
          <div className="profilePicture">
            <div className="imagePlaceholder">
              {/* Add logic to display profile picture if available */}
              <span>No Image</span>
            </div>
            <button className="uploadButton">Upload Image</button>
          </div>
          <div className="userInfo">
            <div className="userInfoItem">
              <label>Email: </label>
              <input
                type="email"
                placeholder={user?.email || 'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="userInfoItem">
              <label>Username: </label>
              <input
                type="text"
                placeholder={user?.username || 'Username'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="userInfoItem">
              <label>Password: </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="updateButton" onClick={handleUpdate}>Update</button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
