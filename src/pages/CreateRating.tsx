import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/CreateRating.css";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { createRating } from "../services/apiService";
import { useAuth } from "../Context/AuthContext";

const CreateRating = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !image) return;

    const formData = new FormData();
    formData.append("title", movieName);
    formData.append("rating", rating.toString());
    formData.append("movie_image", image);
    formData.append("owner", user._id);

    try {
      console.log("Submitting rating:", {
        title: movieName,
        rating,
        image,
        owner: user._id,
      });
      console.log("the FormData is", formData.get("title"));
      const result = await createRating(formData);
      console.log("Rating submission result:", result);
      navigate("/home");
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <Layout>
      <div className="create-rating-page">
        <h1 className="page-title">Create a Rating</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="image-upload">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="uploaded-image"
              />
            ) : (
              <div
                className="image-placeholder"
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <p>Click to upload movie poster</p>
              </div>
            )}
            <input
              type="file"
              id="fileInput"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
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
                {[...Array(10)].map((_star, index) => {
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
              Submit Rating
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateRating;
