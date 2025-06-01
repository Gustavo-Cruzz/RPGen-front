import React from "react";
import TextInput from "../inputArea/TextInput";
import GenerationSection from "./GenerationSection";

const RightColumn = ({
  character,
  handleInputChange,
  isGeneratingText,
  isGeneratingImage,
  generateTextWithLLM,
  generateImageWithHuggingFace,
  generatedText,
  generatedImageUrl,
}) => {
  return (
    <div className="right-column">
      <TextInput
        input_id="traits"
        label="Additional Traits & Talents"
        placeholder="Personality traits, ideals, bonds, flaws, and special abilities..."
        value={character.traits}
        onChange={handleInputChange}
      />
      <TextInput
        input_id="equipment"
        label="Equipment"
        placeholder="Weapons, armor, and other possessions..."
        value={character.equipment}
        onChange={handleInputChange}
      />
      <GenerationSection
        character={character}
        isGeneratingText={isGeneratingText}
        isGeneratingImage={isGeneratingImage}
        generateTextWithLLM={generateTextWithLLM}
        generateImageWithHuggingFace={generateImageWithHuggingFace}
        generatedText={generatedText}
        generatedImageUrl={generatedImageUrl}
      />
      <TextInput
        input_id="history"
        label="Character History"
        placeholder="Will be automatically generated after clicking on the 'Generate Backstory' button. Feel free to change or add any details."
        rows="6"
        value={character.history}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default RightColumn;