import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CharactersContext } from "../context/CharactersContext";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../hooks/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";
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
  
  // Acesso às traduções
  const { t } = useLanguage();

  const { theme, toggleTheme } = useTheme();

  if (loading) {
    return <div>{t('loadingCharacters')}</div>;
  }

  return (
    <div className="my-characters-container">
      <div className="language-selector-container">
        <LanguageSelector />
      </div>
      
      {/* Barra de navegação superior */}
      <div className="header-nav">
        <Link to="/" className="nav-link">
          {t('homepage')}
        </Link>
<<<<<<< dark_mode

        <div style={{ display: "flex", gap: "1rem" }}>
          <button onClick={toggleTheme} className="logout-button">
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
=======
        <button onClick={logout} className="logout-button">
          {t('logout')}
        </button>
>>>>>>> main
      </div>

      <h1>{t('myCharacters')}</h1>
      <h2>
        {t('numberOfCharacters')}: {numCharacters}/{maxCharacters}
      </h2>

      {/* Grade com os personagens */}
      <div className="characters-grid">
        {numCharacters < maxCharacters && (
          <Link to="/character/new" className="new-character-card">
            + {t('createNewCharacter')}
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
