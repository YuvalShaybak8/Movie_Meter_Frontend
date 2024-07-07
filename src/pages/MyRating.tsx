import React, { useState } from "react";
import "../styles/MyRating.css";
import Layout from "../components/Layout";
import { movies } from "../data/movieDatabase.js";
import MovieCard from "../components/MovieCard.js";

const MyRating = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  const handleRateMovie = (movieId: number, rating: number) => {
    setRatings((prevRatings) => ({
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
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  userRating={ratings[movie.id] || 0}
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

export default MyRating;
