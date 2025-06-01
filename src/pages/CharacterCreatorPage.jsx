import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CharacterSheet from "../components/characterSheet/CharacterSheet";
import { useCharacter } from "../hooks/useCharacter";
import ImportExportButtons from "../components/ImportExportButtons";
import "./CharacterCreatorPage.css";

const CharacterCreatorPage = () => {
  const { logout } = useContext(AuthContext);
  const characterId = useParams().id;
  const newCharacter = characterId === "new";

  const {
    character,
    handleInputChange,
    saveCharacter,
    isGeneratingText,
    isGeneratingImage,
    generatedText,
    generatedImageUrl,
    generateTextWithLLM,
    generateImageWithHuggingFace,
    exportCharacter,
    importCharacter,
    loadCharacter,
  } = useCharacter();

  useEffect(() => {
    loadCharacter(characterId);
  }, [characterId, loadCharacter]);

  const handleSave = async () => {
    try {
      await saveCharacter(); // Esta função precisa ser atualizada para enviar para o backend
      alert("Character saved successfully!");
    } catch (error) {
      alert("Failed to save character");
    }
  };

  return (
    <div className="creator-container">
      <div className="header-nav">
        <Link to="/my-characters" className="nav-link">
          Back to My Characters
        </Link>
        <ImportExportButtons
          onExport={exportCharacter}
          onImport={importCharacter}
        />
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>

      <h1>{newCharacter ? "Create Character" : "Update Character"}</h1>

      <div className="template-selector">
        <h2>Choose your template:</h2>
        <div className="template-options">
          <button className="template-option active">DnD</button>
          <button className="template-option" disabled>
            Pathfinder (coming soon)
          </button>
          <button className="template-option" disabled>
            Call of Cthulhu (coming soon)
          </button>
        </div>
      </div>

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

      <button onClick={handleSave} className="save-button">
        {newCharacter ? "Save Character" : "Save Changes"}
      </button>
    </div>
  );
};

export default CharacterCreatorPage;
