import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/CommentsPage.css";

const CommentsPage = ({ movie }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchedMovie = movie({ match: { params: { id } } });
    setCurrentMovie(fetchedMovie);
  }, [id, movie]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  if (!currentMovie) return <div className="loading">Loading...</div>;

  return (
    <Layout>
      <div className="comments-page">
        <div className="movie-details">
          <img
            src={currentMovie.image}
            alt={currentMovie.title}
            className="movie-image"
          />
          <h2 className="movie-title">{currentMovie.title}</h2>
        </div>
        <div className="comments-section">
          <h3>Comments</h3>
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <p>{comment}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
              value={comment}
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
