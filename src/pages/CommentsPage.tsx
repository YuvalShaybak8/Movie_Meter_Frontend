import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import "../styles/CommentsPage.css";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

interface Movie {
  _id: string;
  title: string;
  rating: number;
  movie_image: string;
  comments: string[];
}

const CommentsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) {
        console.error("No movie ID provided");
        setError("No movie ID provided");
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/ratings/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setError("Error fetching movie details");
      }
    };

    fetchMovie();
  }, [id]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !id) return;

    try {
      const response = await axios.put(
        `${API_URL}/ratings/${id}`,
        {
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setMovie(response.data);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Error adding comment");
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="error-message">{error}</div>
        <button onClick={() => navigate("/home")}>Go back to Home</button>
      </Layout>
    );
  }

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <Layout>
      <div className="comments-page">
        <div className="movie-details">
          <img
            src={`${API_URL}/uploads/${movie.movie_image}`}
            alt={movie.title}
            className="movie-image"
          />
          <h2 className="movie-title-comment">{movie.title}</h2>
          {/* <p className="movie-rating">Rating: {movie.rating}</p> */}
        </div>
        <div className="comments-section">
          <h3>Comments</h3>
          <div className="comments-list">
            {movie.comments.map((comment, index) => (
              <div key={index} className="comment">
                <p>{comment}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CommentsPage;
