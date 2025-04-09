import { useState, useEffect } from "react";

const initialCharacterState = {
  name: "",
  class: "",
  race: "",
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
    if (name === "height") {
      value = value + "cm";
    }
    if (name === "weight") {
      value = value + "kg";
    }
    if (name === "age") {
      value = value + " years old";
    }
    characterUpdate(name, value);
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
        setGeneratedText(data.texto_gerado);
        characterUpdate("history", data.texto_gerado);
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
              "Name:" +
              character.name +
              "Class:" +
              character.class +
              "Race:" +
              character.race +
              "Age:" +
              character.age +
              "Height:" +
              character.height +
              "Weight:" +
              character.weight +
              "eyeColor:" +
              character.eyeColor +
              "skinColor:" +
              character.skinColor +
              "hairColor:" +
              character.hairColor +
              "description:" +
              character.description +
              "allies:" +
              character.allies +
              "notes:" +
              character.notes +
              "traits:" +
              character.traits +
              "equipment:" +
              character.equipment +
              "History:" +
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
  };
};
