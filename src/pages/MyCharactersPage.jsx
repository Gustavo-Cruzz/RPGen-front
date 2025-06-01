import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CharactersContext } from '../context/CharactersContext';
import { AuthContext } from '../context/AuthContext';
import './MyCharactersPage.css';

const MyCharactersPage = () => {
  const { characters, loading } = useContext(CharactersContext);
  const { logout } = useContext(AuthContext);

  if (loading) {
    return <div>Carregando personagens...</div>;
  }

  return (
    <div className="my-characters-container">
      <div className="header-nav">
        <Link to="/" className="nav-link">Homepage</Link>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>

      <h1>Meus personagens</h1>

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
          + Criar novo personagem
        </Link>
      </div>
    </div>
  );
};

export default MyCharactersPage;