import React from 'react';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';

const CharacterSheet = ({
  character,
  handleInputChange,
  isGeneratingText,
  isGeneratingImage,
  generateTextWithLLM,
  generateImage,
  generatedText,
  generatedImageUrl
}) => {
  return (
    <div className="character-sheet">
      <LeftColumn character={character} handleInputChange={handleInputChange} />
      <RightColumn
        character={character}
        handleInputChange={handleInputChange}
        isGeneratingText={isGeneratingText}
        isGeneratingImage={isGeneratingImage}
        generateTextWithLLM={generateTextWithLLM}
        generateImage={generateImage}
        generatedText={generatedText}
        generatedImageUrl={generatedImageUrl}
      />
    </div>
  );
};

export default CharacterSheet;