import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CharactersContext } from "../context/CharactersContext";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import LanguageSelector from "../components/LanguageSelector";
import "./MyCharactersPage.css";

const MyCharactersPage = () => {
  // Acesso ao estado global de personagens
  const { characters, loading, fetchCharacters, maxCharacters, numCharacters} =
    useContext(CharactersContext);

  const hasFetched = useRef(false);
  // Ao montar o componente, busca os personagens do usuário autenticado
  useEffect(() => {
    if (!hasFetched.current) {
      fetchCharacters();
      hasFetched.current = true;
    }
  }, [fetchCharacters]);

  // Acesso à função de logout do contexto de autenticação
  const { logout } = useContext(AuthContext);
  
  // Acesso às traduções
  const { t } = useLanguage();

  // Enquanto os personagens estão sendo carregados, exibe feedback visual
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
        <button onClick={logout} className="logout-button">
          {t('logout')}
        </button>
      </div>

      <h1>{t('myCharacters')}</h1>
      <h2>
        {t('numberOfCharacters')}: {numCharacters}/{maxCharacters}
      </h2>
      {/* Grade com os personagens */}
      <div className="characters-grid">
        {/* Card para criar novo personagem */}
        {numCharacters < maxCharacters && (
          <Link to="/character/new" className="new-character-card">
            + {t('createNewCharacter')}
          </Link>
        )}

        {/* Lista dos personagens existentes */}
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
