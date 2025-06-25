import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CharactersContext } from "../context/CharactersContext";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../hooks/ThemeContext";
import "./MyCharactersPage.css";

const MyCharactersPage = () => {
  const { characters, loading, fetchCharacters, maxCharacters, numCharacters } =
    useContext(CharactersContext);

  const hasFetched = useRef(false);
  useEffect(() => {
    if (!hasFetched.current) {
      fetchCharacters();
      hasFetched.current = true;
    }
  }, [fetchCharacters]);

  const { logout } = useContext(AuthContext);

  const { theme, toggleTheme } = useTheme();

  if (loading) {
    return <div>Carregando personagens...</div>;
  }

  return (
    <div className="my-characters-container">
      {/* Barra de navegação superior */}
      <div className="header-nav">
        <Link to="/" className="nav-link">
          Homepage
        </Link>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={toggleTheme} className="logout-button">
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <h1>Meus personagens</h1>
      <h2>
        Número de personagens: {numCharacters}/{maxCharacters}
      </h2>

      {/* Grade com os personagens */}
      <div className="characters-grid">
        {numCharacters < maxCharacters && (
          <Link to="/character/new" className="new-character-card">
            + Criar novo personagem
          </Link>
        )}

        {characters.map((character) => (
          <Link
            key={character._id}
            to={`/character/${character._id}`}
            className="character-card"
          >
            {character.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyCharactersPage;
