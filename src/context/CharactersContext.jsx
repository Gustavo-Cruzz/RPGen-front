import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Busca todos os personagens do usuário autenticado.
   *
   * Esta função realiza uma requisição GET para a rota /characters
   * e atualiza o estado local `characters` com a resposta da API.
   *
   * @returns {Promise<void>}
   * @throws Registra no console qualquer erro ocorrido durante a requisição.
   */
  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await api.get('/characters');
      setCharacters(response.data);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Busca um personagem específico pelo ID.
   *
   * Esta função realiza uma requisição GET para a rota /characters/:id
   * e retorna os dados do personagem correspondente.
   *
   * @param {string} id - O ID do personagem a ser buscado.
   * @returns {Promise<Object>} O personagem retornado pela API.
   * @throws Lança erro se a requisição falhar.
   */
  const getCharacterById = async (id) => {
    try {
      const response = await api.get(`/characters/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar personagem com id ${id}:`, error);
      throw error;
    }
  };

  // Executa a busca de todos os personagens assim que o componente é montado
  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <CharactersContext.Provider value={{
      characters,
      loading,
      fetchCharacters,
      getCharacterById
    }}>
      {children}
    </CharactersContext.Provider>
  );
};
