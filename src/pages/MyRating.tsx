import React from "react";
import Layout from "../components/Layout";
import "../styles/MyRating.css";
import { movies } from "../data/movieDatabase";

const MyRating = () => {
  return (
    <Layout>
      <div className="myRatingPage">
        <div className="contentWrapper">
          <div className="welcomeSection">
            <h1>Welcome to Your Ratings</h1>
            <p>See your movies that you Rate</p>
          </div>
          <section className="featuredMovies">
            <h2>My Rating Feed</h2>
            <div className="movieGrid">
              {movies.map((movie) => (
                <div key={movie.id} className="movieCard">
                  <div className="moviePoster">
                    <img src={movie.image} alt={movie.title} />
                    <div className="movieRating">{movie.rating}</div>
                  </div>
                  <div className="movieInfo">
                    <div className="movieTitle">{movie.title}</div>
                    <div className="movieYear">{movie.year}</div>
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

export default MyRating;
