import React from 'react';

const Header = ({ saveCharacter }) => {
  return (
    <header>
      <h1>D&D 5E Character Sheet</h1>
      <button onClick={saveCharacter} className="save-btn">
        Save Character
        <span className="save-tooltip">(Saved to browser storage)</span>
      </button>
    </header>
  );
};

export default Header;