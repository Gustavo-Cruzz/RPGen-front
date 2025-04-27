import { useState, useEffect } from "react";

const initialCharacterState = {
  name: "",
  class: "",
  race: "",
  gender: "",
  age: "",
  height: "",
  weight: "",
  eyeColor: "",
  skinColor: "",
  hairColor: "",
  description: "",
  allies: "",
  notes: "",
  traits: "",
  history: "",
  equipment: "",
};

export const useCharacter = () => {
  const [character, setCharacter] = useState(initialCharacterState);
  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  const characterUpdate = (name, value) => {
    console.groupCollapsed(`Updating character.${name}`);
    console.log("Previous value:", character[name]);
    console.log("New value:", value);
    console.groupEnd();
    setCharacter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    var { name, value } = e.target;
    if (name === "height") {
      value = value + "cm";
    }
    if (name === "weight") {
      value = value + "kg";
    }
    if (name === "age") {
      value = value + " years old";
    }
    characterUpdate(name, value);
  };

  const saveCharacter = () => {
    console.log("Saving character:", character); // Debug log
    localStorage.setItem("dndCharacter", JSON.stringify(character));
    console.log(
      "LocalStorage updated:",
      JSON.parse(localStorage.getItem("dndCharacter"))
    ); // Verify write
    alert("Character saved locally!");
  };

  const loadCharacter = () => {
    const savedCharacter = localStorage.getItem("dndCharacter");
    console.log("Loading from localStorage:", savedCharacter); // Debug log
    if (savedCharacter) {
      try {
        const parsed = JSON.parse(savedCharacter);
        console.log("Parsed character data:", parsed);
        setCharacter(parsed);
      } catch (error) {
        console.error("Failed to parse character:", error);
      }
    }
  };

  const generateTextWithLLM = async () => {
    setIsGeneratingText(true);
    const backend_url = `${process.env.REACT_APP_BACKEND_URL}api/gerar-texto`;
    try {
      const response = await fetch(backend_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt:
            "Make a backstory for a D&D character using this information as base:" +
            "\nName:" +
            character.name +
            "\nClass:" +
            character.class +
            "\nRace:" +
            character.race +
            "\nGender:" +
            character.gender +
            "\nAge:" +
            character.age +
            "\nHeight:" +
            character.height +
            "\nWeight:" +
            character.weight +
            "\nEye color:" +
            character.eyeColor +
            "\nSkin color:" +
            character.skinColor +
            "\nHair color:" +
            character.hairColor +
            "\nDescription:" +
            character.description +
            "\nAllies:" +
            character.allies +
            "\nNotes:" +
            character.notes +
            "\nTraits:" +
            character.traits +
            "\nEquipment:" +
            character.equipment +
            "." +
            "\n Write only the backstory, no other information or text.",
        }),
      });
      console.log("Backend URL:", backend_url);
      if (response.ok) {
        const data = await response.json();

        setGeneratedText(data["Generated Text"]);
        characterUpdate("history", data["Generated Text"]);
      } else {
        console.error("Failed to generate text:", response.statusText);
        setGeneratedText("Failed to generate backstory.");
      }
    } catch (error) {
      console.error("Error generating text:", error);
      setGeneratedText("Error generating backstory.");
    } finally {
      setIsGeneratingText(false);
    }
  };
  
  const generateImage = async () => {
    // Basic check
    if (!character || !character.name || !character.class || !character.race) {
      setGenerationError("Please ensure basic character details (Name, Class, Race) are filled out.");
      return; // Exit function early
    }

    setIsGeneratingImage(true);
    setGeneratedImageUrl(''); // Clear previous image
    setGenerationError('');   // Clear previous error

    // Construct prompt safely
    const prompt = `Make an image for a D&D character using this information as base:
    Name: ${character.name || 'N/A'}
    Class: ${character.class || 'N/A'}
    Race: ${character.race || 'N/A'}
    Gender: ${character.gender || 'N/A'}
    Age: ${character.age || 'N/A'}
    Height: ${character.height || 'N/A'}
    Weight: ${character.weight || 'N/A'}
    Eye Color: ${character.eyeColor || 'N/A'}
    Skin Color: ${character.skinColor || 'N/A'}
    Hair Color: ${character.hairColor || 'N/A'}
    Description: ${character.description || 'N/A'}
    Allies: ${character.allies || 'N/A'}
    Notes: ${character.notes || 'N/A'}
    Traits: ${character.traits || 'N/A'}
    Equipment: ${character.equipment || 'N/A'}
    History: ${character.history || 'N/A'}`;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/gerar-imagem`, // Ensure variable is set
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.imagem_base64) {
          // Set the state variable, don't return JSX here
          setGeneratedImageUrl(`data:image/png;base64,${data.imagem_base64}`);
        } else {
          // Handle case where backend responded OK but didn't send image data
           throw new Error("Image data not found in response.");
        }
      } else {
        // Try to get more specific error from backend
        let errorMsg = `Failed to generate image: ${response.status} ${response.statusText}`;
         try {
            const errorData = await response.json();
            // Use error key from backend if available
            errorMsg = `Error: ${errorData.error || errorMsg}`;
         } catch(e) {
            // Ignore if error response is not JSON
         }
        throw new Error(errorMsg); // Throw to be caught below
      }
    } catch (error) {
      console.error("Error generating image:", error);
      // Set the error state for UI feedback
      setGenerationError(error.message || "An unexpected error occurred during image generation.");
      setGeneratedImageUrl(""); // Ensure image URL is cleared on error
    } finally {
      setIsGeneratingImage(false); // Stop loading indicator regardless of outcome
    }

  };

  const resetCharacter = () => {
    setCharacter(initialCharacterState);
    setGeneratedText("");
    setGeneratedImageUrl("");
  };

  useEffect(() => {
    loadCharacter();
  }, []);

  return {
    character,
    handleInputChange,
    saveCharacter,
    isGeneratingText,
    isGeneratingImage,
    generatedText,
    generatedImageUrl,
    generateTextWithLLM,
    generateImage,
    resetCharacter,
  };
};
