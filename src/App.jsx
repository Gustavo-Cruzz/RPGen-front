import React from "react";
import "./App.css";
import Header from "./components/Header";
import CharacterSheet from "./components/characterSheet/CharacterSheet";
import Footer from "./components/Footer";
import { useCharacter } from "./hooks/useCharacter";

function App() {
  const {
    character,
    handleInputChange,
    saveCharacter,
    isGeneratingText,
    isGeneratingImage,
    generatedText,
    generatedImageUrl,
    generateTextWithLLM,
    generateImageWithHuggingFace
  } = useCharacter();

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