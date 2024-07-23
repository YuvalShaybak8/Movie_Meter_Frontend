import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/EditRatingPage.css";
import { FaStar } from "react-icons/fa";
import {
  getRatingById,
  updateRating,
  deleteRating,
} from "../services/apiService";

const EditRatingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const movieFromState = location.state?.movie;

  const [ratingData, setRatingData] = useState({
    _id: "",
    title: "",
    rating: 0,
    movie_image: "",
  });
  const [newImage, setNewImage] = useState<File | null>(null);
  const [hover, setHover] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      if (movieFromState) {
        setRatingData({
          _id: movieFromState._id,
          title: movieFromState.title,
          rating: movieFromState.rating,
          movie_image: movieFromState.movie_image,
        });
      } else if (id) {
        try {
          const data = await getRatingById(id);
          setRatingData({
            _id: data._id,
            title: data.title,
            rating: data.rating,
            movie_image: data.movie_image,
          });
        } catch (error) {
          console.error("Error fetching rating:", error);
        }
      }
    };

    fetchRating();
  }, [id, movieFromState]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImage(e.target.files[0]);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRatingData({ ...ratingData, title: e.target.value });
  };

  const handleRatingChange = (newRating: number) => {
    setRatingData({ ...ratingData, rating: newRating });
  };

  const handleUpdateRating = async () => {
    if (ratingData._id) {
      try {
        const formData = new FormData();
        formData.append("title", ratingData.title);
        formData.append("rating", ratingData.rating.toString());
        if (newImage) {
          formData.append("movie_image", newImage);
        }

        const updatedRating = await updateRating(ratingData._id, formData);

        // Update the local state with the new average rating
        setRatingData((prevState) => ({
          ...prevState,
          averageRating: updatedRating.averageRating,
        }));

        navigate("/my-rating");
      } catch (error) {
        console.error("Error updating rating:", error);
        alert("Failed to update rating. Please try again.");
      }
    } else {
      console.error("No rating ID available");
      alert("Cannot update rating: No ID available");
    }
  };

  const handleDelete = async () => {
    if (ratingData._id) {
      try {
        await deleteRating(ratingData._id);
        navigate("/my-rating");
      } catch (error) {
        console.error("Error deleting rating:", error);
        alert("Failed to delete rating. Please try again.");
      }
    }
  };

  return (
    <Layout>
      <div className="edit-rating-page">
        <h1 className="page-title">Edit Your Rating</h1>
        <div className="form">
          <div className="image-upload">
            <img
              src={
                newImage
                  ? URL.createObjectURL(newImage)
                  : `${import.meta.env.VITE_REACT_APP_API_URL}/uploads/${
                      ratingData.movie_image
                    }`
              }
              alt="Movie"
              className="uploaded-image"
            />
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
                value={ratingData.title}
                onChange={handleTitleChange}
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
                        onChange={() => handleRatingChange(ratingValue)}
                        checked={ratingValue === ratingData.rating}
                        className="star-radio-input"
                      />
                      <FaStar
                        className={`star ${
                          ratingValue <= (hover || ratingData.rating)
                            ? "active"
                            : ""
                        }`}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <button
              onClick={() => {
                handleUpdateRating();
              }}
              className="submit-button"
            >
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
        </div>
      </div>
    </Layout>
  );
};

export default EditRatingPage;
