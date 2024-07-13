import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import Layout from "../components/Layout";
import MovieCard from "../components/MovieCard";
import { getAllRatings } from "../services/apiService";

const HomePage = () => {
  const [ratings, setRatings] = useState([]);
  const [userRatings, setUserRatings] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const fetchedRatings = await getAllRatings();
        setRatings(fetchedRatings);
      } catch (error) {
        console.error("Error fetching ratings:", error);
      }
    };

    fetchRatings();
  }, []);

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
                  movie={movie}
                  userRating={userRatings[movie._id] || 0}
                  onRateMovie={handleRateMovie}
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
