import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await api.get('/characters');
        setCharacters(response.data);
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <CharactersContext.Provider value={{ characters, loading }}>
      {children}
    </CharactersContext.Provider>
  );
};
