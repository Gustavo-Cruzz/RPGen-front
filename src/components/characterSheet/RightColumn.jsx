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
        input_id="traits"
        label="Additional Traits & Talents"
        placeholder="Personality traits, ideals, bonds, flaws, and special abilities..."
        value={FormData.characterTraits}
        onChange={handleInputChange}
      />
      <TextInput
        input_id="history"
        label="Character History"
        placeholder="Background story, significant life events, and motivations..."
        rows="6"
        value={character.history}
        onChange={handleInputChange}
      />
      <TextInput
        input_id="equipment"
        label="Equipment"
        placeholder="Weapons, armor, and other possessions..."
        value={FormData.characterEquipment}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default RightColumn;