import React, { useState } from "react";
import axios from "axios";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { movies } from "../data/movieDatabase.js";
import trailerIcon from "../assets/trailer_icon.png";
import commentIcon from "../assets/comment_icon.png";
import ratingIn from "../assets/rating_in.png";
import ratingOut from "../assets/rating_out.png";
import myRating from "../assets/my_rating.png";
import { FaStar } from "react-icons/fa";

const API_KEY = "b04e7ba5db91cb63b41243b69801c5f1";

const HomePage = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [ratings, setRatings] = useState({});

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

  const handleRatingClick = (movie) => {
    setSelectedMovie(movie);
    setRatingOpen(true);
  };

  const handleRateMovie = () => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [selectedMovie.id]: userRating,
    }));
    setRatingOpen(false);
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
                    <div className="movie-rating">
                      <img
                        src={ratingIn}
                        alt="Rating"
                        className="rating-icon"
                      />
                      <span className="rating-text">{movie.rating}</span>
                    </div>
                    <div className="movie-rating-top-left">
                      <img
                        src={ratings[movie.id] ? myRating : ratingOut}
                        alt="Rating"
                        className="rating-icon"
                        onClick={() => handleRatingClick(movie)}
                      />
                      {ratings[movie.id] && (
                        <span className="my-rating-text">
                          {ratings[movie.id]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="movie-info">
                    <div className="movie-title">{movie.title}</div>
                    <div className="movie-icons">
                      <Link to={`/comments/${movie.id}`}>
                        <img
                          src={commentIcon}
                          alt="Comment"
                          className="comment-icon"
                        />
                      </Link>
                      <button
                        className="trailer-button"
                        onClick={() => fetchTrailer(movie.title)}
                      >
                        <img
                          src={trailerIcon}
                          alt="Trailer"
                          className="trailer-icon"
                        />
                        <span className="trailer-text">Trailer</span>
                      </button>
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

        {ratingOpen && (
          <div className="modal-rating" onClick={() => setRatingOpen(false)}>
            <div
              className="modal-content-rating"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="close" onClick={() => setRatingOpen(false)}>
                &times;
              </span>
              <h2>Rate This Movie</h2>
              <h3>{selectedMovie?.title}</h3>
              <div className="star-my-rating">
                {[...Array(10)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setUserRating(ratingValue)}
                        style={{ display: "none" }}
                      />
                      <FaStar
                        className={`star ${
                          ratingValue <= (hover || userRating) ? "active" : ""
                        }`}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>
              <button className="rate-button" onClick={handleRateMovie}>
                Rate
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
