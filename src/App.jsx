import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import CharacterSheet from "./components/characterSheet/CharacterSheet";
import Footer from "./components/Footer";

function App() {
  const [character, setCharacter] = useState({
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
  });

  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveCharacter = () => {
    localStorage.setItem("dndCharacter", JSON.stringify(character));
    alert("Character saved locally!");
  };

  const loadCharacter = () => {
    const savedCharacter = localStorage.getItem("dndCharacter");
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
    }
  };

  const generateTextWithLLM = async () => {
    setIsGeneratingText(true);
    setTimeout(() => {
      setGeneratedText(`${character.name} is a ${character.age}-year-old ${character.race} ${character.class}. Standing ${character.height} tall with ${character.eyeColor} eyes and ${character.hairColor} hair, they cut an imposing figure. Their journey began...`);
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

  useEffect(() => {
    loadCharacter();
  }, []);

  return (
    <div className="app">
      <Header saveCharacter={saveCharacter} />
      <CharacterSheet
        character={character}
        handleInputChange={handleInputChange}
        isGeneratingText={isGeneratingText}
        isGeneratingImage={isGeneratingImage}
        generateTextWithLLM={generateTextWithLLM}
        generateImageWithHuggingFace={generateImageWithHuggingFace}
        generatedText={generatedText}
        generatedImageUrl={generatedImageUrl}
      />
      <Footer />
    </div>
  );
}

export default App;