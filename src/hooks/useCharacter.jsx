import {useState, useEffect } from 'react';

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.groupCollapsed(`Updating character.${name}`);
    console.log('Previous value:', character[name]);
    console.log('New value:', value);
    console.groupEnd();
    
    setCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveCharacter = () => {
    console.log('Saving character:', character); // Debug log
    localStorage.setItem("dndCharacter", JSON.stringify(character));
    console.log('LocalStorage updated:', JSON.parse(localStorage.getItem("dndCharacter"))); // Verify write
    alert("Character saved locally!");
  };

  const loadCharacter = () => {
    const savedCharacter = localStorage.getItem("dndCharacter");
    console.log('Loading from localStorage:', savedCharacter); // Debug log
    if (savedCharacter) {
      try {
        const parsed = JSON.parse(savedCharacter);
        console.log('Parsed character data:', parsed);
        setCharacter(parsed);
      } catch (error) {
        console.error('Failed to parse character:', error);
      }
    }
  };

  const generateTextWithLLM = async () => {
    setIsGeneratingText(true);
    setTimeout(() => {
      setGeneratedText(
        `${character.name} is a ${character.age}-year-old ${character.race} ${character.class}. Standing ${character.height} tall with ${character.eyeColor} eyes and ${character.hairColor} hair, they cut an imposing figure. Their journey began...`
      );
      setIsGeneratingText(false);
    }, 2000);
  };

  const generateImageWithHuggingFace = async () => {
    setIsGeneratingImage(true);
    setTimeout(() => {
      setGeneratedImageUrl(
        `https://via.placeholder.com/300x400?text=${character.race}+${character.class}`
      );
      setIsGeneratingImage(false);
    }, 3000);
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
    generateImageWithHuggingFace,
    resetCharacter
  };
};