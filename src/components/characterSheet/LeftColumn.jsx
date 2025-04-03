import React from 'react';

const LeftColumn = ({ character, handleInputChange }) => {
  return (
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
            placeholder="Enter character name"
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
              placeholder="e.g. Fighter"
            />
          </div>
          <div className="form-group">
            <label>Race</label>
            <input
              type="text"
              name="race"
              value={character.race}
              onChange={handleInputChange}
              placeholder="e.g. Elf"
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
              placeholder="e.g. 25"
            />
          </div>
          <div className="form-group">
            <label>Height</label>
            <input
              type="text"
              name="height"
              value={character.height}
              onChange={handleInputChange}
              placeholder="e.g. 5'8\"
            />
          </div>
          <div className="form-group">
            <label>Weight</label>
            <input
              type="text"
              name="weight"
              value={character.weight}
              onChange={handleInputChange}
              placeholder="e.g. 160lbs"
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
              placeholder="e.g. Blue"
            />
          </div>
          <div className="form-group">
            <label>Skin Color</label>
            <input
              type="text"
              name="skinColor"
              value={character.skinColor}
              onChange={handleInputChange}
              placeholder="e.g. Tan"
            />
          </div>
          <div className="form-group">
            <label>Hair Color</label>
            <input
              type="text"
              name="hairColor"
              value={character.hairColor}
              onChange={handleInputChange}
              placeholder="e.g. Black"
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
          placeholder="Physical description and distinguishing features..."
        />
      </div>

      <div className="form-group">
        <label>Allies & Organizations</label>
        <textarea
          name="allies"
          value={character.allies}
          onChange={handleInputChange}
          rows="4"
          placeholder="Notable allies, organizations, or affiliations..."
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea
          name="notes"
          value={character.notes}
          onChange={handleInputChange}
          rows="4"
          placeholder="Additional notes about the character..."
        />
      </div>
    </div>
  );
};

export default LeftColumn;