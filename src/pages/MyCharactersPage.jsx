import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './MyCharactersPage.css';

const MyCharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await api.get('/characters');
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching characters:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  if (loading) {
    return <div>Loading characters...</div>;
  }

  return (
    <div className="my-characters-container">
      <div className="header-nav">
        <Link to="/" className="nav-link">Homepage</Link>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
      
      <h1>My characters</h1>
      
      <div className="characters-grid">
        {characters.map((character) => (
          <Link 
            key={character._id} 
            to={`/character/${character._id}`}
            className="character-card"
          >
            {character.name}
          </Link>
        ))}
        
        <Link to="/create-character" className="new-character-card">
          + Create New Character
        </Link>
      </div>
    </div>
  );
};

export default MyCharactersPage;