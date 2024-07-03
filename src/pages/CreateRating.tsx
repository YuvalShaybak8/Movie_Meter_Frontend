import React, { useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/CreateRating.module.css";
import { FaStar } from "react-icons/fa";

const CreateRating = () => {
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [image, setImage] = useState<File | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ movieName, rating, image });
  };

  return (
    <Layout>
      <div className={styles.createRatingPage}>
        <h1 className={styles.pageTitle}>Create a Rating</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.imageUpload}>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className={styles.uploadedImage}
              />
            ) : (
              <div
                className={styles.imagePlaceholder}
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
          <div className={styles.formContent}>
            <div className={styles.formGroup}>
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
            <div className={styles.formGroup}>
              <label>Rating</label>
              <div className={styles.starRating}>
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
                        className={`${styles.star} ${
                          ratingValue <= (hover || rating) ? styles.active : ""
                        }`}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(0)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>
            <button type="submit" className={styles.submitButton}>
              Submit Rating
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreateRating;
