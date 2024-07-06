import React, { useState } from "react";
import axios from "axios";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { movies } from "../data/movieDatabase.js";
import trailerIcon from "../assets/trailer_icon.png";
import commentIcon from "../assets/comment_icon.png";

const API_KEY = "b04e7ba5db91cb63b41243b69801c5f1";

const HomePage = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchTrailer = async (movieTitle: string) => {
    try {
      const searchResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=${API_KEY}`
      );
      const movieId = searchResponse.data.results[0]?.id;

      if (movieId) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        const trailer = response.data.results.find(
          (video: any) => video.type === "Trailer"
        );

        if (trailer) {
          setVideoUrl(`https://www.youtube.com/embed/${trailer.key}`);
          setIsOpen(true);
        } else {
          alert("Trailer not available");
        }
      } else {
        alert("Movie not found");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert("Failed to fetch trailer");
    }
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
                    <div className="movie-icons">
                      <img
                        src={trailerIcon}
                        alt="Trailer"
                        className="trailer-icon"
                        onClick={() => fetchTrailer(movie.title)}
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
                </div>
              ))}
            </div>
          </section>
        </div>

        {isOpen && (
          <div className="modal" onClick={() => setIsOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close" onClick={() => setIsOpen(false)}>
                &times;
              </span>
              <iframe
                width="100%"
                height="400"
                src={videoUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
