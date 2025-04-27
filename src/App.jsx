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
    generateImage
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
        generateImage={generateImage}
        generatedText={generatedText}
        generatedImageUrl={generatedImageUrl}
      />
      <Footer />
    </div>
  );
}

export default App;