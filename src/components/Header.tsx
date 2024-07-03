import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import { logout } from "../utils/AuthUtils";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">MovieMeter</div>
      <nav className="nav">
        <Link className="nav-button" to="/home">
          Home
        </Link>
        <Link className="nav-button" to="/create-rating">
          Create a Rating
        </Link>
        <Link className="nav-button" to="/my-rating">
          My Rating
        </Link>
        <Link className="nav-button" to="/my-profile">
          My Profile
        </Link>
      </nav>
      <button className="logout-btn" onClick={logout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
