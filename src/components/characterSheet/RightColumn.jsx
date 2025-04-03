import React from 'react';

const RightColumn = ({
  character,
  handleInputChange,
  isGeneratingText,
  isGeneratingImage,
  generateTextWithLLM,
  generateImageWithHuggingFace,
  generatedText,
  generatedImageUrl
}) => {
  return (
    <div className="right-column">
      <div className="form-group">
        <label>Additional Traits & Talents</label>
        <textarea
          name="traits"
          value={character.traits}
          onChange={handleInputChange}
          rows="4"
          placeholder="Personality traits, ideals, bonds, flaws, and special abilities..."
        />
      </div>

      <div className="form-group">
        <label>Character History</label>
        <textarea
          name="history"
          value={character.history}
          onChange={handleInputChange}
          rows="6"
          placeholder="Background story, significant life events, and motivations..."
        />
      </div>

      <div className="form-group">
        <label>Equipment</label>
        <textarea
          name="equipment"
          value={character.equipment}
          onChange={handleInputChange}
          rows="4"
          placeholder="Weapons, armor, and other possessions..."
        />
      </div>

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
            'Generate Backstory'
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
            'Generate Character Image'
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
            <img src={generatedImageUrl} alt={`Generated portrait of ${character.name}`} />
            <button 
              className="download-btn"
              onClick={() => window.open(generatedImageUrl, '_blank')}
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightColumn;