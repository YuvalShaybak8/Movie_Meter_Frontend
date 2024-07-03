import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/HomePage.module.css";
import { movies } from "../data/movieDatabase.js";

const HomePage = () => {
  return (
    <Layout>
      <div className={styles.homePage}>
        <div className={styles.contentWrapper}>
          <div className={styles.welcomeSection}>
            <h1>Welcome to MovieMeter</h1>
            <p>Discover and rate your favorite movies</p>
          </div>
          <section className="featured-movies">
            <h2>The Rating Feed</h2>
            <div className={styles.movieGrid}>
              {movies.map((movie) => (
                <div key={movie.id} className={styles.movieCard}>
                  <div className={styles.moviePoster}>
                    <img src={movie.image} alt={movie.title} />
                    <div className={styles.movieRating}>{movie.rating}</div>
                  </div>
                  <div className={styles.movieInfo}>
                    <div className={styles.movieTitle}>{movie.title}</div>
                    <div className={styles.movieYear}>{movie.year}</div>
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
