import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/AuthStyles.css";
import googleIcon from "../assets/google_icon.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, googleSignIn } = useAuth();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem("loggedinUser", JSON.stringify(response.user));
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.accessToken}`;
      navigate("/home");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      await googleSignIn(credentialResponse.credential);
      navigate("/home");
    } catch (error) {
      setError("Google sign-in failed. Please try again.");
    }
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h1 className="Heading">Login</h1>
      <div className="SocialIcons">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            setError("Google sign-in failed. Please try again.");
          }}
          render={({ onClick }) => (
            <button
              type="button"
              onClick={onClick}
              style={{ background: "none", border: "none", cursor: "pointer" }}
            >
              <img
                src={googleIcon}
                alt="Google Sign-In"
                style={{ width: "30px", height: "30px" }}
              />
            </button>
          )}
        />
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
          <FaEye className="InputIcon" onClick={handleTogglePassword} />
        ) : (
          <FaEyeSlash className="InputIcon" onClick={handleTogglePassword} />
        )}
      </div>
      {error && <p className="Error">{error}</p>}
      <button type="submit" className="Button">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
