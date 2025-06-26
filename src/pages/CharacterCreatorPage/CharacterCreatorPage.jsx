import { useContext, useEffect, useState } from "react"; 
import { Link, useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CharactersContext } from "../../context/CharactersContext";
import { useLanguage } from "../../context/LanguageContext";
import LanguageSelector from "../../components/LanguageSelector";
import CharacterSheet from "./components/characterSheet/CharacterSheet";
import { useCharacter, initialCharacterState } from "../../hooks/useCharacter";
import ImportExportButtons from "./components/ImportExportButtons";
import "./CharacterCreatorPage.css";

const CharacterCreatorPage = () => {
  const { logout } = useContext(AuthContext);
  const {
    numCharacters,
    maxCharacters,
    patchCharacter,
    putCharacter,
    deleteCharacter,
    getCharacterById,
  } = useContext(CharactersContext);

  // Acesso às traduções
  const { t } = useLanguage();

  const {
    character,
    handleInputChange,
    saveCharacter,
    isGeneratingText,
    isGeneratingImage,
    generatedText,
    generatedImageUrl,
    generateTextWithLLM,
    generateImage,
    exportCharacter,
    importCharacter,
    loadCharacter,
    getCharacterChanges,
  } = useCharacter();

  const characterId = useParams().id;
  const newCharacter = characterId === "new";
  const navigate = useNavigate();

  // Estado para controlar a exibição durante o carregamento dos dados
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (newCharacter) {

      // Redireciona o usuário caso ele já tenha atingido o limite de personagens
      if (numCharacters >= maxCharacters){
        navigate("/my-characters");
      }

      // CASO 1: É um personagem novo. Carrega o estado inicial vazio.
      console.log("É um personagem novo. Carregando estado inicial.");
      loadCharacter(initialCharacterState);
      setIsLoading(false);
  } else {
      // CASO 2: É um personagem existente. Busca os dados da API.
      console.log(`É um personagem existente (ID: ${characterId}). Buscando dados...`);
      const fetchCharacterData = async () => {
        try {
          const data = await getCharacterById(characterId);
          if (data) {
            loadCharacter(data);
          } else {
            console.warn("Personagem não encontrado. Carregando formulário em branco.");
            loadCharacter(initialCharacterState);
            // navegar de volta 
            navigate("/my-characters");
          }
        } catch (error) {
          console.error("Falha ao carregar o personagem:", error);
          // Em caso de erro, carrega o estado inicial para não quebrar a UI
          loadCharacter(initialCharacterState);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchCharacterData();
    }
  }, [characterId, newCharacter, getCharacterById, loadCharacter, navigate, maxCharacters, numCharacters]); 

  const handleSave = async () => {
    try {
      if (newCharacter) {
        // Para um personagem novo, sempre usar POST
        await saveCharacter();
      } else {
        // Para um personagem existente, verificar as alterações
        const changedFields = getCharacterChanges();

          if (changedFields.length === 0) {
          console.log("Nenhuma alteração foi feita.");
        } else if (changedFields.length >= 16) {
          console.log("Alterando o personagem com PUT (todos os campos)");
          await putCharacter(characterId, character);
        } else {
          const changes = {};
          changedFields.forEach((field) => {
            changes[field] = character[field];
          });
          console.log("Alterações (PATCH):", changes);
          await patchCharacter(characterId, changes);
        }
      }
      navigate("/my-characters");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert(`Falha ao salvar ${newCharacter ? "personagem" : "alterações"}`);
    }
  };

  const handleDelete = async () => {
    if (newCharacter) {
      navigate("/my-characters");
      return;
    }

    if (window.confirm(t('deleteConfirmation'))) {
      try {
        await deleteCharacter(characterId);
        navigate("/my-characters");
      } catch (error) {
        alert("Falha ao deletar o personagem. Tente novamente.");
        console.error("Erro ao deletar personagem:", error);
      }
    }
  };

  // Exibe uma mensagem de "Carregando" enquanto os dados não estão prontos
  if (isLoading) {
    return (
      <div className="creator-container">
        <h1>{t('loadingCharacter')}</h1>
      </div>
    );
  }

  return (
    <div className="creator-container">
      <div className="language-selector-container">
        <LanguageSelector />
      </div>
      
      <div className="header-nav">
        <Link to="/my-characters" className="nav-link">
          {t('backToMyCharacters')}
        </Link>
        <ImportExportButtons
           onExport={exportCharacter}
           onImport={importCharacter}
           character={character}
        />
        <button onClick={logout} className="logout-button">
          {t('logout')}
        </button>
      </div>

      <h1>{newCharacter ? t('createCharacter') : t('updateCharacter')}</h1>

      <div className="template-selector">
        <h2>{t('chooseTemplate')}</h2>
        <div className="template-options">
          <button className="generate-btn">DnD</button>
          <button className="generate-btn" disabled>
            {t('pathfinderComingSoon')}
          </button>
          <button className="generate-btn" disabled>
            {t('cthulhuComingSoon')}
          </button>
        </div>
      </div>

      <CharacterSheet
        character={character}
        handleInputChange={handleInputChange}
        isGeneratingText={isGeneratingText}
        isGeneratingImage={isGeneratingImage}
        generateTextWithLLM={generateTextWithLLM}
        generateImage={generateImage}
        generatedText={generatedText}
        generatedImageUrl={generatedImageUrl}
      />

      <button onClick={handleSave} className="generate-btn">
        {newCharacter ? t('saveCharacter') : t('saveChanges')}
      </button>
      <button onClick={handleDelete} className="generate-btn">
        {newCharacter ? t('cancel') : t('deleteCharacter')}
      </button>
    </div>
  );
};

export default CharacterCreatorPage;