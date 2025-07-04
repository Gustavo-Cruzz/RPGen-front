import { useState, useEffect, useCallback } from "react";
import api from "../services/api"
export const initialCharacterState = {
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
  const [originalCharacter, setOriginalCharacter] = useState(null);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  const characterUpdate = (name, value) => {
    console.groupCollapsed(`Updating character.${name}`);
    console.log("Previous value:", character[name]);
    console.log("New value:", value);
    console.groupEnd();
    setCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const setCharacterAndOriginal = useCallback((charData) => {
  setCharacter({...charData});
  setOriginalCharacter({...charData});
}, []);

  const handleInputChange = (e) => {
    var { name, value } = e.target;
  // Para campos numéricos, removemos qualquer unidade antes de atualizar
  if (name === "height" || name === "weight" || name === "age") {
    // Remove unidades e caracteres não numéricos, mantendo apenas números
    const numericValue = value.replace(/[^0-9]/g, '');
    characterUpdate(name, numericValue);
  } else {
    characterUpdate(name, value);
  }
  };

const loadCharacter = useCallback((charData) => {
  if (!charData) return;
  
  console.log("Loading character data into hook:", charData);
  setCharacterAndOriginal(charData);
}, [setCharacterAndOriginal]);

const getCharacterChanges = useCallback(() => {
  if (!originalCharacter || !character) return [];
  const changes = []; 
  const allKeys = new Set([...Object.keys(character), ...Object.keys(originalCharacter)]);
  allKeys.forEach(key => {
    const currentVal = character[key];
    const originalVal = originalCharacter[key];
    if (JSON.stringify(currentVal) !== JSON.stringify(originalVal)) {
      changes.push(key);
    }
  });
  return changes;
}, [character, originalCharacter]);

  const generateTextWithLLM = async () => {
    setIsGeneratingText(true);
    try {
      const response = await api.post('/api/gerar-texto', {
        prompt:
          "Make a backstory for a D&D character using this information as base:" +
          "\nName:" +
          character.name +
          "\nClass:" +
          character.class +
          "\nRace:" +
          character.race +
          "\nGender:" +
          character.gender +
          "\nAge:" +
          character.age +
          "\nHeight:" +
          character.height +
          "\nWeight:" +
          character.weight +
          "\nEye color:" +
          character.eyeColor +
          "\nSkin color:" +
          character.skinColor +
          "\nHair color:" +
          character.hairColor +
          "\nDescription:" +
          character.description +
          "\nAllies:" +
          character.allies +
          "\nNotes:" +
          character.notes +
          "\nTraits:" +
          character.traits +
          "\nEquipment:" +
          character.equipment +
          "." +
          "\n Write only the backstory, no other information or text.",
      });
      if (response.data && response.data["generated_text"]) {
        setGeneratedText(response.data["generated_text"]);
        characterUpdate("history", response.data["generated_text"]);
      } else {
        setGeneratedText("Failed to generate backstory.");
        console.error("Unexpected response:", response.data);
      }
    } catch (error) {
      console.error("Error generating text:", error);
      setGeneratedText("Error generating backstory.");
    } finally {
      setIsGeneratingText(false);
    }
  };

  const generateImage = async () => {
    setIsGeneratingImage(true);
    try {
      const response = await api.post('/api/gerar-imagem', {
        prompt:
          "Make an image for a D&D character using this information as base:" +
          "\nName:" +
          character.name +
          "\nClass:" +
          character.class +
          "\nRace:" +
          character.race +
          "\nGender:" +
          character.gender +
          "\nAge:" +
          character.age +
          "\nHeight:" +
          character.height +
          "\nWeight:" +
          character.weight +
          "\neyeColor:" +
          character.eyeColor +
          "\nskinColor:" +
          character.skinColor +
          "\nhairColor:" +
          character.hairColor +
          "\ndescription:" +
          character.description +
          "\nallies:" +
          character.allies +
          "\nnotes:" +
          character.notes +
          "\ntraits:" +
          character.traits +
          "\nequipment:" +
          character.equipment +
          "\nHistory:" +
          character.history,
      });
      console.log(response)
    if (response.data && response.data.imagem_base64) {
      setGeneratedImageUrl(`data:image/png;base64,${response.data.imagem_base64}`);
    } else {
      console.error("Failed to generate image:", response.data);
      setGeneratedImageUrl("");
      alert("Free account does not support image creation");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    setGeneratedImageUrl("");
  } finally {
    setIsGeneratingImage(false);
  }
  };

  const resetCharacter = () => {
    setCharacter(initialCharacterState);
    setGeneratedText("");
    setGeneratedImageUrl("");
  };

  useEffect(() => {
    loadCharacter();
  }, [loadCharacter]);
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
    const response = await api.post('/my-characters', character);
    return response.data;
  } catch (error) {
    console.error('Error saving character:', error);
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
    generateImage,
    resetCharacter,
    exportCharacter, 
    importCharacter,
    loadCharacter,
    getCharacterChanges,  
  };
  
};

