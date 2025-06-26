import React from "react";
import GenerationButton from "./GenerationButton";
import DownloadButton from "./DownloadButton";

const GenerationSection = ({
  character,
  isGeneratingText,
  isGeneratingImage,
  generateTextWithLLM,
  generateImage,
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
          onClick={generateImage}
          disabled={isGeneratingImage}
          loadingText="Generating Image..."
          defaultText="Generate Image"
        />
      </div>

      {generatedImageUrl && (
        <div className="generated-image">
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
