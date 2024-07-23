import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "../styles/MovieCard.css";
import { addUserRating, getUserRatingForMovie } from "../services/apiService";
import { Movie } from "../types";

import trailerIcon from "../assets/trailer_icon.png";
import commentIcon from "../assets/comment_icon.png";
import ratingIn from "../assets/rating_in.png";
import ratingOut from "../assets/rating_out.png";
import myRating from "../assets/my_rating.png";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

interface MovieCardProps {
  movie: Movie;
  onRateMovie: (movieId: string, rating: number) => void;
  isMyRatingsPage?: boolean;
  currentUser: any;
  userRating: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onRateMovie,
  isMyRatingsPage = false,
  currentUser,
  userRating,
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [hover, setHover] = useState(0);
  const [tempUserRating, setTempUserRating] = useState(userRating);
  const [movieRating, setMovieRating] = useState(
    movie.averageRating || movie.rating
  );
  const [hasUserRated, setHasUserRated] = useState(userRating > 0);

  useEffect(() => {
    if (currentUser && currentUser._id) {
      getUserRatingForMovie(movie._id, currentUser._id)
        .then((rating) => {
          setTempUserRating(rating);
          setHasUserRated(rating > 0);
        })
        .catch((error) => console.error("Error fetching user rating:", error));
    }
  }, [movie._id, currentUser]);

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

  const handleRatingClick = () => {
    setRatingOpen(true);
  };

  const handleRateMovie = async () => {
    try {
      const result = await addUserRating(movie._id, tempUserRating);
      onRateMovie(movie._id, tempUserRating);
      setRatingOpen(false);
      setMovieRating(result.averageRating);
      setHasUserRated(true);
      setTempUserRating(tempUserRating);
    } catch (error) {
      console.error("Error rating movie:", error);
    }
  };

  const showRatingIcon = currentUser && currentUser._id !== movie.owner;

  return (
    <>
      <div className="movie-card">
        <div className="movie-poster">
          <img
            src={`${API_URL}/uploads/${movie.movie_image}`}
            alt={movie.title}
          />
          <div className="movie-rating">
            <img src={ratingIn} alt="Rating" className="rating-icon" />
            <span
              className={`rating-text ${
                movieRating === 10 ? "rating-text-ten" : "rating-text-other"
              }`}
            >
              {movieRating === 10 ? "10" : movieRating.toFixed(1)}
            </span>
          </div>
          {showRatingIcon && (
            <div className="movie-rating-top-left">
              <img
                src={hasUserRated ? myRating : ratingOut}
                alt="Rating"
                className="rating-icon"
                onClick={handleRatingClick}
              />
              {hasUserRated && (
                <span
                  className="my-rating-text"
                  style={{ left: tempUserRating === 10 ? "7px" : "11px" }}
                >
                  {tempUserRating}
                </span>
              )}
            </div>
          )}
        </div>
        <div className="movie-info">
          <div className="movie-title">{movie.title}</div>
          {isMyRatingsPage && (
            <Link
              to={`/editRating/${movie._id}`}
              state={{ movie }}
              className="edit-button"
            >
              Edit
            </Link>
          )}
          <div className="movie-icons">
            <div className="movie-actions">
              <Link to={`/comments/${movie._id}`} className="comment-link">
                <img src={commentIcon} alt="Comment" className="comment-icon" />
                {(movie.commentsCount ?? 0) > 0 && (
                  <span className="comments-count">{movie.commentsCount}</span>
                )}
              </Link>
            </div>
            <button
              className="trailer-button"
              onClick={() => fetchTrailer(movie.title)}
            >
              <img src={trailerIcon} alt="Trailer" className="trailer-icon" />
              <span className="trailer-text">Trailer</span>
            </button>
          </div>
        </div>
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
              src={videoUrl ?? undefined}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {ratingOpen && (
        <div className="modal-rate" onClick={() => setRatingOpen(false)}>
          <div
            className="modal-content-rate"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close" onClick={() => setRatingOpen(false)}>
              &times;
            </span>
            <h2>Rate This Movie</h2>
            <h3>{movie.title}</h3>
            <div className="star-my-rating">
              {[...Array(10)].map((_star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setTempUserRating(ratingValue)}
                      style={{ display: "none" }}
                    />
                    <FaStar
                      className={`star ${
                        ratingValue <= (hover || tempUserRating) ? "active" : ""
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
    </>
  );
};

export default MovieCard;
