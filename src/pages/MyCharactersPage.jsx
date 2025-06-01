import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CharactersContext } from "../context/CharactersContext";
import { AuthContext } from "../context/AuthContext";
import "./MyCharactersPage.css";

const MyCharactersPage = () => {
  // Acesso ao estado global de personagens
  const { characters, loading, fetchCharacters } =
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

  // Enquanto os personagens estão sendo carregados, exibe feedback visual
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
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>

      <h1>Meus personagens</h1>

      {/* Grade com os personagens */}
      <div className="characters-grid">
        {/* Card para criar novo personagem */}
        <Link to="/character/new" className="new-character-card">
          + Criar novo personagem
        </Link>

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
