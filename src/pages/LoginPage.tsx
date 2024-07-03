import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/AuthStyles.css";
import googleIcon from "../assets/google_icon.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    // If login is successful, navigate to the home page
    navigate("/home");
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h1 className="Heading">Login</h1>
      <div className="SocialIcons">
        <button
          type="button"
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img
            src={googleIcon}
            alt="Google Sign-In"
            style={{ width: "30px", height: "30px" }}
          />
        </button>
      </div>
      <span className="SmallText">or use your email account</span>
      <div className="InputContainer">
        <input
          className="Input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <FaEnvelope className="InputIcon" />
      </div>
      <div className="InputContainer">
        <input
          className="Input"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {showPassword ? (
          <FaEyeSlash
            className="InputIcon"
            onClick={() => setShowPassword(false)}
          />
        ) : (
          <FaEye className="InputIcon" onClick={() => setShowPassword(true)} />
        )}
      </div>
      <button className="Button" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
