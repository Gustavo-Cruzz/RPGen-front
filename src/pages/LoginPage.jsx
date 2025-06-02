import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/my-characters');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
         <Link to="/" className="auth-button">
          Back to Home
        </Link>
        <h1>RPGen</h1>
        <h2>Login</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="auth-error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className="auth-button">Login</button>
      </form>
      
      <div className="auth-footer">
        <p>Or, if you don't have an account yet</p>
        <Link to="/register" className="auth-link">Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;