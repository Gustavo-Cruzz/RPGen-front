import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="app-header">
        <h1>RPGen</h1>
        <p>An online DnD character creator, powered by Artificial Intelligence for a real experience!</p>
      </div>
      
      <div className="auth-options">
        <div className="auth-box">
          <h3>Already have an account?</h3>
          <p>Great, then login to view your characters! Let the fun begin!</p>
          <Link to="/login" className="auth-button">Login</Link>
        </div>
        
        <div className="auth-box">
          <h3>New here?</h3>
          <p>Then what are you waiting for? Create your account and have fun with your characters!</p>
          <Link to="/register" className="auth-button">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;