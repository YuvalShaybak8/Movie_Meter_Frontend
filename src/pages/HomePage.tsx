import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/HomePage.css";
import { movies } from "../data/movieDatabase.js";
import trailerIcon from "../assets/trailer_icon.png";
import commentIcon from "../assets/comment_icon.png";

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
                    <img
                      src={trailerIcon}
                      alt="Trailer"
                      className="trailer-icon"
                    />
                    <Link to={`/comments/${movie.id}`}>
                      <img
                        src={commentIcon}
                        alt="Comment"
                        className="comment-icon"
                      />
                    </Link>
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
