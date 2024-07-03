import React, { useState } from "react";
import "../styles/AuthStyles.css";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";

const AuthContainer: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="PageContainer">
      <div className="Container">
        <div className={`FormContainer sign-in ${isActive ? "active" : ""}`}>
          <LoginPage />
        </div>
        <div className={`FormContainer sign-up ${isActive ? "active" : ""}`}>
          <SignUpPage />
        </div>
        <div className={`ToggleContainer ${isActive ? "active" : ""}`}>
          <div className={`Toggle ${isActive ? "active" : ""}`}>
            <div
              className={`TogglePanel toggle-left ${isActive ? "active" : ""}`}
            >
              <h1 className="Heading2">Welcome Back!</h1>
              <p className="Paragraph">
                To keep connected with us
                <br />
                please login with your personal info
              </p>
              <button className="ToggleButton" onClick={handleToggle}>
                Sign In
              </button>
            </div>
            <div
              className={`TogglePanel toggle-right ${isActive ? "active" : ""}`}
            >
              <h1 className="Heading2">Hello, Friend!</h1>
              <p className="Paragraph">
                Enter your personal details
                <br />
                and start your journey with us
              </p>
              <button className="ToggleButton" onClick={handleToggle}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
