import { useState, useContext, useCallback } from "react";
import api from "../services/api";
import { CharactersContext } from "../context/CharactersContext"; // Importa o contexto

// Estado inicial para um personagem vazio
const initialCharacterState = {
  name: "",
  class: "",
  race: "",
  gender: "",
  age: "",
  height: "",
  weight: "",
  eyeColor: "",
  skinColor: "",
  hairColor: "",
  description: "",
  allies: "",
  notes: "",
  traits: "",
  history: "",
  equipment: "",
};

export const useCharacter = () => {
  const [character, setCharacter] = useState(initialCharacterState);
  const [originalCharacter, setOriginalCharacter] = useState(initialCharacterState); // Guarda o personagem original
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  const { getCharacterById } = useContext(CharactersContext);

  const characterUpdate = (name, value) => {
    console.groupCollapsed(`Atualizando character.${name}`);
    console.log("Valor anterior:", character[name]);
    console.log("Novo valor:", value);
    console.groupEnd();
    setCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["height", "weight", "age"].includes(name)) {
      const numericValue = value.replace(/[^0-9]/g, "");
      characterUpdate(name, numericValue);
    } else {
      characterUpdate(name, value);
    }
  };

  // Memoiza e carrega personagem, além de salvar o original para comparação
  const loadCharacter = useCallback(async (id) => {
    try {
      if (id === "new") {
        setCharacter(initialCharacterState);
        setOriginalCharacter(initialCharacterState);
        return;
      }
      const data = await getCharacterById(id);
      console.log("Personagem carregado via API:", data);
      setCharacter(data);
      setOriginalCharacter(data); // Salva estado original para futuras comparações
    } catch (error) {
      console.error("Erro ao carregar personagem via API:", error);
    }
  }, [getCharacterById]);

  /**
   * Compara o personagem atual com o original e retorna
   * um array com os nomes dos campos que foram alterados.
   */
  const getCharacterChanges = () => {
    const changedFields = [];

    Object.keys(character).forEach((key) => {
      if (character[key] !== originalCharacter[key]) {
        changedFields.push(key);
      }
    });

    return changedFields;
  };

  const generateTextWithLLM = async () => {
    setIsGeneratingText(true);
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}/gerar-texto`;

    try {
      const response = await fetch(backend_url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt:
            "Make a backstory for a D&D character using this information as base:" +
            "\nName:" + character.name +
            "\nClass:" + character.class +
            "\nRace:" + character.race +
            "\nGender:" + character.gender +
            "\nAge:" + character.age +
            "\nHeight:" + character.height +
            "\nWeight:" + character.weight +
            "\nEye color:" + character.eyeColor +
            "\nSkin color:" + character.skinColor +
            "\nHair color:" + character.hairColor +
            "\nDescription:" + character.description +
            "\nAllies:" + character.allies +
            "\nNotes:" + character.notes +
            "\nTraits:" + character.traits +
            "\nEquipment:" + character.equipment +
            "." +
            "\n Write only the backstory, no other information or text.",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedText(data["Generated Text"]);
        characterUpdate("history", data["Generated Text"]);
      } else {
        console.error("Falha ao gerar texto:", response.statusText);
        setGeneratedText("Falha ao gerar história.");
      }
    } catch (error) {
      console.error("Erro ao gerar texto:", error);
      setGeneratedText("Erro ao gerar história.");
    } finally {
      setIsGeneratingText(false);
    }
  };

  const generateImageWithHuggingFace = async () => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/gerar-imagem`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt:
              "Make an image for a D&D character using this information as base:" +
              "\nName:" + character.name +
              "\nClass:" + character.class +
              "\nRace:" + character.race +
              "\nGender:" + character.gender +
              "\nAge:" + character.age +
              "\nHeight:" + character.height +
              "\nWeight:" + character.weight +
              "\nEye color:" + character.eyeColor +
              "\nSkin color:" + character.skinColor +
              "\nHair color:" + character.hairColor +
              "\nDescription:" + character.description +
              "\nAllies:" + character.allies +
              "\nNotes:" + character.notes +
              "\nTraits:" + character.traits +
              "\nEquipment:" + character.equipment +
              "\nHistory:" + character.history,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setGeneratedImageUrl(`data:image/png;base64,${data.imagem_base64}`);
      } else {
        console.error("Falha ao gerar imagem:", response.statusText);
        setGeneratedImageUrl("");
      }
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
      setGeneratedImageUrl("");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const resetCharacter = () => {
    setCharacter(initialCharacterState);
    setOriginalCharacter(initialCharacterState);
    setGeneratedText("");
    setGeneratedImageUrl("");
  };

  const exportCharacter = () => {
    const dataStr = JSON.stringify(character, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `${character.name || 'character'}.json`;
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importCharacter = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target.result);
          console.log("Dados importados:", parsedData);
          setCharacter(parsedData);
          setOriginalCharacter(parsedData); // Atualiza original também
          resolve(parsedData);
        } catch (error) {
          console.error("Erro ao importar:", error);
          reject(error);
        }
      };

      fileReader.onerror = (error) => {
        console.error("Erro no FileReader:", error);
        reject(error);
      };

      fileReader.readAsText(file);
    });
  };

  const saveCharacter = async () => {
    try {
      const response = await api.post('/characters', character);
      return response.data;
    } catch (error) {
      console.error('Erro ao salvar personagem:', error);
      throw error;
    }
  };

  return {
    character,
    handleInputChange,
    saveCharacter,
    isGeneratingText,
    isGeneratingImage,
    generatedText,
    generatedImageUrl,
    generateTextWithLLM,
    generateImageWithHuggingFace,
    resetCharacter,
    exportCharacter,
    importCharacter,
    loadCharacter,
    getCharacterChanges,
  };
};
