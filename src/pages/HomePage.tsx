import React from "react";
import Layout from "../components/Layout";
import "../styles/HomePage.css";
import { movies } from "../data/movieDatabase.js";

const HomePage = () => {
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
                <div key={movie.id} className="movie-card">
                  <div className="movie-poster">
                    <img src={movie.image} alt={movie.title} />
                    <div className="movie-rating">{movie.rating}</div>
                  </div>
                  <div className="movie-info">
                    <div className="movie-title">{movie.title}</div>
                    <div className="movie-year">{movie.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
