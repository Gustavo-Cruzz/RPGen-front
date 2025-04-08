import React from "react";
import GenerationButton from "./GenerationButton";
import DownloadButton from "./DownloadButton";

const GenerationSection = ({
  character,
  isGeneratingText,
  isGeneratingImage,
  generateTextWithLLM,
  generateImageWithHuggingFace,
  generatedText,
  generatedImageUrl,
}) => {
  return (
    <div className="generation-section">
      <h2>AI Generation</h2>
      
      <div className="button-group">
        <GenerationButton
          onClick={generateTextWithLLM}
          disabled={isGeneratingText}
          loadingText="Generating Backstory..."
          defaultText="Generate Backstory"
        />
        
        <GenerationButton
          onClick={generateImageWithHuggingFace}
          disabled={isGeneratingImage}
          loadingText="Generating Image..."
          defaultText="Generate Character Image"
        />
      </div>

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
          <DownloadButton url={generatedImageUrl} />
        </div>
      )}
    </div>
  );
};

export default GenerationSection;