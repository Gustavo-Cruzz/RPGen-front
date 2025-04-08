import React, { useState, useEffect } from 'react';
import './App.css';

// Componente de Introdução
const IntroAnimation = ({ onComplete }) => {
  useEffect(() => {
    const typingElement = document.getElementById("typing");
    const introContainer = document.querySelector(".intro-container");
    const text = "RPG Character Generator";
    let index = 0;

    const typeEffect = () => {
      if (index < text.length) {
        typingElement.innerHTML = text.substring(0, index + 1);
        index++;
        setTimeout(typeEffect, 150);
      } else {
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }
    };

    setTimeout(typeEffect, 500);
  }, [onComplete]);

  return (
    <div className="intro-container">
      <div id="typing" className="typing-text"></div>
      <span className="cursor">|</span>
    </div>
  );
};

function App() {
  const [showMain, setShowMain] = useState(false);
  const [character, setCharacter] = useState({
    name: '',
    class: '',
    race: '',
    age: '',
    height: '',
    weight: '',
    eyeColor: '',
    skinColor: '',
    hairColor: '',
    description: '',
    allies: '',
    notes: '',
    traits: '',
    history: '',
    equipment: ''
  });

  const [isGeneratingText, setIsGeneratingText] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCharacter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveCharacter = () => {
    localStorage.setItem('dndCharacter', JSON.stringify(character));
    alert('Not ready yet!');
  };

  const loadCharacter = () => {
    const savedCharacter = localStorage.getItem('dndCharacter');
    if (savedCharacter) {
      setCharacter(JSON.parse(savedCharacter));
    }
  };

  const generateTextWithLLM = async () => {
    setIsGeneratingText(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gerar-texto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: character.description }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedText(data.texto_gerado);
      } else {
        console.error('Failed to generate text:', response.statusText);
        setGeneratedText('Failed to generate backstory.');
      }
    } catch (error) {
      console.error('Error generating text:', error);
      setGeneratedText('Error generating backstory.');
    } finally {
      setIsGeneratingText(false);
    }
  };

  const generateImage = async () => {
    setIsGeneratingImage(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/gerar-imagem`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: character.name }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedImageUrl(`data:image/png;base64,${data.imagem_base64}`);
      } else {
        console.error('Failed to generate image:', response.statusText);
        setGeneratedImageUrl('');
      }
    } catch (error) {
      console.error('Error generating image:', error);
      setGeneratedImageUrl('');
    } finally {
      setIsGeneratingImage(false);
    }
  };
  
  useEffect(() => {
    loadCharacter();
  }, []);

  return (
    <div className="app">
      {!showMain ? (
        <IntroAnimation onComplete={() => setShowMain(true)} />
      ) : (
        <>
          <header>
            <h1>D&D 5E Character Sheet</h1>
            <button onClick={saveCharacter} className="save-btn">Save Character<p>(coming soon!)</p></button>
          </header>

          <div className="character-sheet">
            {/* ... resto do seu conteúdo existente ... */}
          </div>

          <footer>
            <p>Based on D&D 5E Official Character Sheet. © {new Date().getFullYear()} Wizards of the Coast LLC.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;