import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthContainer from "./components/AuthContainer";
import CreateRating from "./pages/CreateRating";
import MyProfile from "./pages/MyProfile";
import MyRating from "./pages/MyRating";
import CommentsPage from "./pages/CommentsPage";
import { movies } from "./data/movieDatabase";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthContainer />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-rating" element={<CreateRating />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-rating" element={<MyRating />} />
        <Route
          path="/comments/:id"
          element={
            <CommentsPage
              movie={(props: any) => {
                const movieId = parseInt(props.match.params.id);
                return movies.find((m) => m.id === movieId);
              }}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
