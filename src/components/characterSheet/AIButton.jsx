import React from 'react';

const GenerateButton = ({
  onClick,
  isGenerating,
  idleText = "Generate Backstory",
  loadingText = "Generating Backstory...",
  className = "generate-btn",
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isGenerating || disabled}
      className={className}
    >
      {isGenerating ? (
        <span className="generating-text">{loadingText}</span>
      ) : (
        idleText
      )}
    </button>
  );
};

export default GenerateButton;