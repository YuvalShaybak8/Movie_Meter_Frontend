import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditRatingPage from "./pages/EditRatingPage";
import AuthContainer from "./components/AuthContainer";
import CreateRating from "./pages/CreateRating";
import MyProfile from "./pages/MyProfile";
import MyRating from "./pages/MyRating";
import CommentsPage from "./pages/CommentsPage";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_Client_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_Client_ID}>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

function AppRoutes() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedinUser");
    const accessToken = localStorage.getItem("accessToken");
    if (loggedInUser && accessToken && !user) {
      navigate("/home");
    }
  }, [user, navigate]);

  console.log("Current user:", user);

  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/editRating/:ratingid" element={<EditRatingPage />} />
          <Route path="/create-rating" element={<CreateRating />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-rating" element={<MyRating />} />
          <Route path="/comments/:id" element={<CommentsPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<AuthContainer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
}

export default App;
