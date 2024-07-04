import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/HomePage.css";
import { movies } from "../data/movieDatabase.js";
import trailerIcon from "../assets/trailer_icon.png";
import axios from "axios";
import Modal from "react-modal";

const API_KEY = "b04e7ba5db91cb63b41243b69801c5f1";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  const fetchTrailer = async (movieId) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const trailer = response.data.results.find(
        (video) => video.type === "Trailer"
      );
      if (trailer) {
        setVideoUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        setIsOpen(true);
      } else {
        alert("Trailer not available");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Failed to fetch trailer");
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setVideoUrl("");
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
