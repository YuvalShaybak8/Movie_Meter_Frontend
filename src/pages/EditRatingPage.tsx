/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import "../styles/EditRatingPage.css";
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  getRatingById,
  updateRating,
  deleteRating,
} from "../services/apiService";
import { useAuth } from "../Context/AuthContext";

const EditRatingPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState("");
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        console.log("Fetching rating with ID:", id);
        const data = await getRatingById(id);
        console.log("Fetched rating data:", data);
        setMovieName(data.title);
        setRating(data.rating);
        setExistingImage(data.movie_image);
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    if (id) {
      fetchRating();
    }
  }, [id]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", movieName);
    formData.append("rating", rating.toString());
    if (image) {
      formData.append("movie_image", image);
    }

    try {
      await updateRating(id, formData);
      navigate("/my-rating");
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRating(id);
      navigate("/my-rating");
    } catch (error) {
      console.error("Error deleting rating:", error);
    }
  };

  return (
    <Layout>
      <div className="edit-rating-page">
        <h1 className="page-title">Edit Your Rating</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="image-upload">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="uploaded-image"
              />
            ) : existingImage ? (
              <img
                src={`${
                  import.meta.env.VITE_REACT_APP_API_URL
                }/uploads/${existingImage}`}
                alt="Movie"
                className="uploaded-image"
              />
            ) : (
              <div>No image available</div>
            )}
            <input
              type="file"
              id="fileInput"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            <button
              type="button"
              className="upload-button"
              onClick={() => document.getElementById("fileInput")?.click()}
            >
              Choose File
            </button>
          </div>
          <div className="form-content">
            <div className="form-group">
              <label htmlFor="movieName">Movie Name</label>
              <input
                type="text"
                id="movieName"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                placeholder="Enter movie name"
                required
              />
            </div>
            <div className="form-group">
              <label>Rating</label>
              <div className="star-rating">
                {[...Array(10)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <label key={index}>
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        onClick={() => setRating(ratingValue)}
                        style={{ display: "none" }}
                      />
                      <FaStar
                        className={`star ${
                          ratingValue <= (hover || rating) ? "active" : ""
                        }`}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <button type="submit" className="submit-button">
              Update Your Rating
            </button>
            <button
              type="button"
              className="delete-button"
              onClick={handleDelete}
            >
              Delete Your Rating
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditRatingPage;
