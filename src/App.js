import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
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
    // placeholder
    setTimeout(() => {
      setGeneratedText(`blablablablablablablablablablablabla`);
      setIsGeneratingText(false);
    }, 2000);
  };

  const generateImageWithHuggingFace = async () => {
    setIsGeneratingImage(true);
    // placeholder
    setTimeout(() => {
      setGeneratedImageUrl('https://via.placeholder.com/300x400?text=Generated+Character+Image');
      setIsGeneratingImage(false);
    }, 3000);
  };

  useEffect(() => {
    loadCharacter();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>D&D 5E Character Sheet</h1>
        <button onClick={saveCharacter} className="save-btn">Save Character<p>(coming soon!)</p></button>
      </header>

      <div className="character-sheet">
        <div className="left-column">
          <div className="basic-info">
            <h2>Basic Information</h2>
            <div className="form-group">
              <label>Character Name</label>
              <input 
                type="text" 
                name="name" 
                value={character.name} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Class</label>
                <input 
                  type="text" 
                  name="class" 
                  value={character.class} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Race</label>
                <input 
                  type="text" 
                  name="race" 
                  value={character.race} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Age</label>
                <input 
                  type="text" 
                  name="age" 
                  value={character.age} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Height</label>
                <input 
                  type="text" 
                  name="height" 
                  value={character.height} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Weight</label>
                <input 
                  type="text" 
                  name="weight" 
                  value={character.weight} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Eye Color</label>
                <input 
                  type="text" 
                  name="eyeColor" 
                  value={character.eyeColor} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Skin Color</label>
                <input 
                  type="text" 
                  name="skinColor" 
                  value={character.skinColor} 
                  onChange={handleInputChange} 
                />
              </div>
              <div className="form-group">
                <label>Hair Color</label>
                <input 
                  type="text" 
                  name="hairColor" 
                  value={character.hairColor} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={character.description} 
              onChange={handleInputChange} 
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Allies & Organizations</label>
            <textarea 
              name="allies" 
              value={character.allies} 
              onChange={handleInputChange} 
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea 
              name="notes" 
              value={character.notes} 
              onChange={handleInputChange} 
              rows="4"
            />
          </div>
        </div>

        <div className="right-column">
          <div className="form-group">
            <label>Additional Traits & Talents</label>
            <textarea 
              name="traits" 
              value={character.traits} 
              onChange={handleInputChange} 
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Character History</label>
            <textarea 
              name="history" 
              value={character.history} 
              onChange={handleInputChange} 
              rows="6"
            />
          </div>

          <div className="form-group">
            <label>Equipment</label>
            <textarea 
              name="equipment" 
              value={character.equipment} 
              onChange={handleInputChange} 
              rows="4"
            />
          </div>

          <div className="generation-section">
            <h2>AI Generation</h2>
            <button 
              onClick={generateTextWithLLM} 
              disabled={isGeneratingText}
              className="generate-btn"
            >
              {isGeneratingText ? 'Generating...' : 'Generate Backstory'}
            </button>
            
            <button 
              onClick={generateImageWithHuggingFace} 
              disabled={isGeneratingImage}
              className="generate-btn"
            >
              {isGeneratingImage ? 'Generating...' : 'Generate Character Image'}
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
                <img src={generatedImageUrl} alt="Generated character" />
              </div>
            )}
          </div>
        </div>
      </div>

      <footer>
        <p>Based on D&D 5E Official Character Sheet. © {new Date().getFullYear()} Wizards of the Coast LLC.</p>
      </footer>
    </div>
  );
}

export default App;