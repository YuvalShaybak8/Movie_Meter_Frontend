import React, { useState, useEffect } from "react";
import "../styles/MyRating.css";
import Layout from "../components/Layout";
import { getUserRatings } from "../services/apiService";
import MovieCard from "../components/MovieCard";
import { useAuth } from "../Context/AuthContext";

const MyRating = () => {
  const { user } = useAuth();
  const [ratings, setRatings] = useState([]);
  const [userRatings, setUserRatings] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchUserRatings = async () => {
      try {
        const data = await getUserRatings();
        setRatings(data);
      } catch (error) {
        console.error("Error fetching user ratings:", error);
      }
    };

    fetchUserRatings();
  }, [user]);

  const handleRateMovie = (movieId: string, rating: number) => {
    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating,
    }));
  };

  return (
    <Layout>
      <div className="my-rating-page">
        <div className="content-wrapper-my-rating">
          <div className="welcome-section">
            <h1>Welcome to Your Ratings</h1>
            <p>See the movies that you've rated</p>
          </div>
          <section className="featured-movies">
            <h2>My Ratings</h2>
            <div className="movie-grid">
              {ratings.map((rating) => (
                <MovieCard
                  key={rating._id}
                  movie={{
                    ...rating,
                    commentsCount: rating.commentsCount,
                  }}
                  userRating={userRatings[rating._id] || rating.rating}
                  onRateMovie={handleRateMovie}
                  isMyRatingsPage={true} // Pass this prop
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default MyRating;
