import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import { getAllRatings, getUserRatings } from "../services/apiService";
import { useAuth } from "../Context/AuthContext";

const HomePage = () => {
  const [ratings, setRatings] = useState([]);
  const [userRatings, setUserRatings] = useState<{ [key: string]: number }>({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const fetchedRatings = await getAllRatings();
        setRatings(fetchedRatings);

        if (user) {
          const userRatingsData = await getUserRatings();
          const userRatingsMap = {};
          userRatingsData.forEach((rating) => {
            userRatingsMap[rating._id] = rating.rating;
          });
          setUserRatings(userRatingsMap);
        }
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, [user]);

  const handleRateMovie = (movieId: string, rating: number) => {
    setUserRatings((prevRatings) => ({
      ...prevRatings,
      [movieId]: rating,
    }));
  };

  return (
    <Layout>
      <div className="home-page">
        <div className="content-wrapper">
          <div className="welcome-section">
            <h1>Welcome to MovieMeter</h1>
            <p>Discover and rate your favorite movies</p>
          </div>
          <section className="featured-movies">
            <h2>The Rating Feed</h2>
            <div className="movie-grid">
              {ratings.map((movie) => (
                <MovieCard
                  key={movie._id}
                  movie={{
                    ...movie,
                    commentsCount: movie.commentsCount,
                  }}
                  userRating={userRatings[movie._id] || 0}
                  onRateMovie={handleRateMovie}
                  currentUser={user}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
