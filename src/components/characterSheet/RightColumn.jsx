import React from "react";
import TextInput from "../Input/TextInput";
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
      <div className="generation-section">
        <h2>AI Generation</h2>
        <button
          onClick={generateTextWithLLM}
          disabled={isGeneratingText}
          className="generate-btn"
        >
          {isGeneratingText ? (
            <span className="generating-text">Generating Backstory...</span>
          ) : (
            "Generate Backstory"
          )}
        </button>

        <button
          onClick={generateImageWithHuggingFace}
          disabled={isGeneratingImage}
          className="generate-btn"
        >
          {isGeneratingImage ? (
            <span className="generating-text">Generating Image...</span>
          ) : (
            "Generate Character Image"
          )}
        </button>

        {generatedText && (
          <div className="generated-output">
            <h3>Generated Backstory</h3>
            <p>{generatedText}</p>
          </div>
        )}

        {generatedImageUrl && (
          <div className="generated-image">
            <h3>Generated Character Image</h3>
            <img
              src={generatedImageUrl}
              alt={`Generated portrait of ${character.name}`}
            />
            <button
              className="download-btn"
              onClick={() => window.open(generatedImageUrl, "_blank")}
            >
              Download Image
            </button>
          </div>
        )}
      </div>
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
        value={FormData.characterHistory}
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