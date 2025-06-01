import { useContext, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CharactersContext } from "../context/CharactersContext"; // Importa o contexto
import CharacterSheet from "../components/characterSheet/CharacterSheet";
import { useCharacter } from "../hooks/useCharacter";
import ImportExportButtons from "../components/ImportExportButtons";
import "./CharacterCreatorPage.css";

const CharacterCreatorPage = () => {
  const { logout } = useContext(AuthContext);
  const { patchCharacter, putCharacter, deleteCharacter } =
    useContext(CharactersContext); // Pega patchCharacter do contexto
  const characterId = useParams().id;
  const newCharacter = characterId === "new";
  const navigate = useNavigate();
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
    getCharacterChanges,
  } = useCharacter();

  const hasLoaded = useRef(false);
  useEffect(() => {
    if (!hasLoaded.current) {
      loadCharacter(characterId);
      hasLoaded.current = true;
    }
  }, [characterId, loadCharacter]);

  const handleSave = async () => {
    try {
      const changedFields = getCharacterChanges();
      if (newCharacter) {
        await saveCharacter();
      } else {
        switch (changedFields.length) {
          case 0:
            console.log("Nenhuma alteração foi feita.");
            break;
          case 16:
            console.log("Alterando o personagem com PUT");
            // Chama o putCharacter com o personagem completo
            await putCharacter(characterId, character);
            break;
          default:
            // Monta o objeto com as alterações para o patch
            const changes = {};
            changedFields.forEach((field) => {
              changes[field] = character[field];
            });
            console.log("Alterações (PATCH):", changes);
            await patchCharacter(characterId, changes);
            break;
        }
      }
      navigate("/my-characters");
    } catch (error) {
      alert(`Falha ao salvar ${newCharacter ? "personagem" : "alterações"}`);
    }
  };

  const handleDelete = async () => {
    if (newCharacter) {
      navigate("/my-characters");
      return;
    }

    try {
      await deleteCharacter(characterId);
      navigate("/my-characters");
    } catch (error) {
      alert("Falha ao deletar o personagem. Tente novamente.");
      console.error("Erro ao deletar personagem:", error);
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
      <button onClick={handleDelete} className="save-button">
        {newCharacter ? "Cancel" : "Delete Character"}
      </button>
    </div>
  );
};

export default CharacterCreatorPage;
