import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import { logout } from "../utils/AuthUtils";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>MovieMeter</div>
      <nav className={styles.nav}>
        <Link className={styles.navButton} to="/home">
          Home
        </Link>
        <Link className={styles.navButton} to="/create-rating">
          Create a Rating
        </Link>
        <Link className={styles.navButton} to="/my-rating">
          My Rating
        </Link>
        <Link className={styles.navButton} to="/my-profile">
          My Profile
        </Link>
      </nav>
      <button className={styles.logoutBtn} onClick={logout}>
        Logout
      </button>
    </header>
  );
};

export default Header;
