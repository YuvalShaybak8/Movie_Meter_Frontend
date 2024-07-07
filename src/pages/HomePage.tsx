import React, { useState } from "react";
import "../styles/HomePage.css";
import Layout from "../components/Layout";
import { movies } from "../data/movieDatabase.js";
import MovieCard from "../components/MovieCard";

const HomePage = () => {
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  const handleRateMovie = (movieId: number, rating: number) => {
    setRatings((prevRatings) => ({
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

export default HomePage;
