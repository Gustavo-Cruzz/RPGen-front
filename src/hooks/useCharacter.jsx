import { useState, useEffect } from "react";

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

  const saveCharacter = () => {
    console.log("Saving character:", character); // Debug log
    localStorage.setItem("dndCharacter", JSON.stringify(character));
    console.log(
      "LocalStorage updated:",
      JSON.parse(localStorage.getItem("dndCharacter"))
    ); // Verify write
    alert("Character saved locally!");
  };

  const loadCharacter = () => {
    const savedCharacter = localStorage.getItem("dndCharacter");
    console.log("Loading from localStorage:", savedCharacter); // Debug log
    if (savedCharacter) {
      try {
        const parsed = JSON.parse(savedCharacter);
        console.log("Parsed character data:", parsed);
        setCharacter(parsed);
      } catch (error) {
        console.error("Failed to parse character:", error);
      }
    }
  };

  const generateTextWithLLM = async () => {
    setIsGeneratingText(true);
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}api/gerar-texto`;
    try {
      const response = await fetch(backend_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });
      console.log("Backend URL:", backend_url);
      if (response.ok) {
        const data = await response.json();

        setGeneratedText(data["Generated Text"]);
        characterUpdate("history", data["Generated Text"]);
      } else {
        console.error("Failed to generate text:", response.statusText);
        setGeneratedText("Failed to generate backstory.");
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
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}api/gerar-imagem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
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
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setGeneratedImageUrl(`data:image/png;base64,${data.imagem_base64}`);
      } else {
        console.error("Failed to generate image:", response.statusText);
        setGeneratedImageUrl("");
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
  }, []);
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
  };
  
};

