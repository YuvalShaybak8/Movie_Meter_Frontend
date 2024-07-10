import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaUser } from "react-icons/fa";
import "../styles/AuthStyles.css";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/apiService";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", { username, email, password }); // Add this line
    try {
      await registerUser({ username, email, password });
      navigate("/home");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <h1 className="Heading">Create Account</h1>
      <div className="InputContainer">
        <input
          className="Input"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <FaUser className="InputIcon" />
      </div>
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
      <button type="submit" className="Button">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpPage;
