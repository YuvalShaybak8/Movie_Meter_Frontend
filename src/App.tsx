import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditRatingPage from "./pages/EditRatingPage";
import AuthContainer from "./components/AuthContainer";
import CreateRating from "./pages/CreateRating";
import MyProfile from "./pages/MyProfile";
import MyRating from "./pages/MyRating";
import CommentsPage from "./pages/CommentsPage";
import { AuthProvider } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_Client_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_Client_ID}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AuthContainer />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/editRating/:ratingid" element={<EditRatingPage />} />
            <Route path="/create-rating" element={<CreateRating />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/my-rating" element={<MyRating />} />
            <Route path="/comments/:id" element={<CommentsPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
