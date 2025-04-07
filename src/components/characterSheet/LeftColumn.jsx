import React from "react";
import SimpleInput from "../input/SimpleInput";
import TextInput from "../input/TextInput";

const LeftColumn = ({ handleInputChange }) => {
  return (
    <div className="left-column">
      <div className="basic-info">
        <h2>Basic Information</h2>
        <SimpleInput
          input_id="name"
          label="Character Name"
          placeholder="Enter character name"
          value={FormData.characterName}
          onChange={handleInputChange}
        />
        <div className="form-row">
          <SimpleInput
            input_id="class"
            label="Class"
            placeholder="e.g. Fighter"
            value={FormData.characterClass}
            onChange={handleInputChange}
          />
          <SimpleInput
            input_id="race"
            label="Race"
            placeholder="e.g. Elf"
            value={FormData.characterRace}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <SimpleInput
            type="text"
            input_id="age"
            label="Age"
            placeholder="e.g. 25"
            value={FormData.characterAge}
            onChange={handleInputChange}
          />
          <SimpleInput
            type="text"
            input_id="height"
            label="Height"
            placeholder="e.g. 160cm"
            value={FormData.characterHeight}
            onChange={handleInputChange}
          />
          <SimpleInput
            type="text"
            input_id="weight"
            label="Weight"
            placeholder="e.g. 80Kg"
            value={FormData.characterWeight}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-row">
          <SimpleInput
            type="text"
            input_id="eyeColor"
            label="Eye Color"
            placeholder="e.g. Blue"
            value={FormData.characterEyeColor}
            onChange={handleInputChange}
          />
          <SimpleInput
            type="text"
            input_id="skinColor"
            label="Skin Color"
            placeholder="e.g. Tan"
            value={FormData.characterSkinColor}
            onChange={handleInputChange}
          />
          <SimpleInput
            type="text"
            input_id="hairColor"
            label="Hair Color"
            placeholder="e.g. Black"
            value={FormData.characterHairColor}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <TextInput
        input_id="description"
        label="Description"
        placeholder="Physical description and distinguishing features..."
        value={FormData.characterDescription}
        onChange={handleInputChange}
      />
      <TextInput
        input_id="allies"
        label="Allies & Organizations"
        placeholder="Notable allies, organizations, or affiliations..."
        value={FormData.characterAllies}
        onChange={handleInputChange}
      />
      <TextInput
        input_id="notes"
        label="Notes"
        placeholder="Additional notes about the character..."
        value={FormData.characterNotes}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default LeftColumn;