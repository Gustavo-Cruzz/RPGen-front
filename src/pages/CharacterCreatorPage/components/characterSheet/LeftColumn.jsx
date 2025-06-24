import React from "react";
import SimpleInput from "../inputArea/SimpleInput";
import TextInput from "../inputArea/TextInput";

const LeftColumn = ({character, handleInputChange }) => {
  return (
    <div className="left-column">
      <div className="basic-info">
        <h2>Basic Information</h2>
        <SimpleInput
          input_id="name"
          label="Character Name"
          placeholder="Enter character name"
          value={character.name}
          onChange={handleInputChange}
        />
        <div className="form-row">
          <SimpleInput
            input_id="class"
            label="Class"
            placeholder="e.g. Fighter"
            value={character.class}
            onChange={handleInputChange}
          />
          <SimpleInput
            input_id="race"
            label="Race"
            placeholder="e.g. Elf"
            value={character.race}
            onChange={handleInputChange}
          />
          <SimpleInput
            input_id="gender"
            label="Gender"
            placeholder="e.g. Female"
            value={character.gender}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <SimpleInput
            type="number"
            input_id="age"
            label="Age"
            placeholder="e.g. 25"
            value={character.age}
            onChange={handleInputChange}
          />
          <SimpleInput
            type="number"
            input_id="height"
            label="Height (cm)"
            placeholder="e.g. 160"
            value={character.height}
            onChange={handleInputChange}
          />
          <SimpleInput
            type="number"
            input_id="weight"
            label="Weight (Kg)"
            placeholder="e.g. 80"
            value={character.weight}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <SimpleInput
            type="text"
            input_id="eyeColor"
            label="Eye Color"
            placeholder="e.g. Blue"
            value={character.eyeColor}
            onChange={handleInputChange}
          />
          <SimpleInput
            type="text"
            input_id="skinColor"
            label="Skin Color"
            placeholder="e.g. Tan"
            value={character.skinColor}
            onChange={handleInputChange}
          />
          <SimpleInput
            type="text"
            input_id="hairColor"
            label="Hair Color"
            placeholder="e.g. Black"
            value={character.hairColor}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <TextInput
        input_id="description"
        label="Description"
        placeholder="Physical description and distinguishing features..."
        value={character.description}
        onChange={handleInputChange}
      />
      <TextInput
        input_id="allies"
        label="Allies & Organizations"
        placeholder="Notable allies, organizations, or affiliations..."
        value={character.allies}
        onChange={handleInputChange}
      />
      <TextInput
        input_id="notes"
        label="Notes"
        placeholder="Additional notes about the character..."
        value={character.notes}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default LeftColumn;