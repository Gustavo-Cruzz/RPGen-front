import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";

export const CharactersContext = createContext();

export const CharactersProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca todos os personagens do usuário autenticado
  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/my-characters");
      setCharacters(response.data);
    } catch (error) {
      console.error("Erro ao buscar personagens:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Busca um personagem específico pelo ID
  const getCharacterById = useCallback(async (id) => {
    try {
      const response = await api.get(`/my-characters/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar personagem com id ${id}:`, error);
      throw error;
    }
  }, []);

  // Atualiza parcialmente um personagem pelo ID com os campos fornecidos
  const patchCharacter = useCallback(async (id, changes) => {
    try {
      console.log(changes);
      const response = await api.patch(`/my-characters/${id}`, changes);
      // Atualiza o estado local dos personagens (opcional)
      setCharacters((prev) =>
        prev.map((char) => (char._id === id ? { ...char, ...changes } : char))
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar personagem com id ${id}:`, error);
      throw error;
    }
  }, []);

  // Substitui completamente um personagem pelo ID
  const putCharacter = useCallback(async (id, newData) => {
    try {
      const response = await api.put(`/my-characters/${id}`, newData);
      setCharacters((prev) =>
        prev.map((char) => (char._id === id ? response.data : char))
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao substituir personagem com id ${id}:`, error);
      throw error;
    }
  }, []);

  // Deleta um personagem pelo ID
  const deleteCharacter = useCallback(async (id) => {
    try {
      await api.delete(`/my-characters/${id}`);
      // Atualiza o estado local removendo o personagem deletado
      setCharacters((prev) => prev.filter((char) => char._id !== id));
    } catch (error) {
      console.error(`Erro ao deletar personagem com id ${id}:`, error);
      throw error;
    }
  }, []);

  // Carrega os personagens na montagem inicial
  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return (
    <CharactersContext.Provider
      value={{
        characters,
        loading,
        fetchCharacters,
        getCharacterById,
        patchCharacter,
        putCharacter,
        deleteCharacter,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
};
