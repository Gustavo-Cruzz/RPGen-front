import React from 'react';

const Header = ({ saveCharacter }) => {
  return (
    <header>
      <h1>D&D 5E Character Sheet</h1>
      <button onClick={saveCharacter} className="save-btn">
        Save Character
        <br/>
        <span className="save-tooltip"><h6>(Work In Progress)</h6></span>
      </button>
    </header>
  );
};

export default Header;