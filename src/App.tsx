import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthContainer from "./components/AuthContainer";
import CreateRating from "./pages/CreateRating";
import MyProfile from "./pages/MyProfile";
import MyRating from "./pages/MyRating";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-rating" element={<CreateRating />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-rating" element={<MyRating />} />
      </Routes>
    </Router>
  );
};

export default App;
