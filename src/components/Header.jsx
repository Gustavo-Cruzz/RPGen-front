import React from 'react';
import ImportExportButtons from './ImportExportButtons';

const Header = ({ saveCharacter, exportCharacter, importCharacter }) => {
  return (
    <header>
      <h1>D&D 5E Character Sheet</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <ImportExportButtons 
          onExport={exportCharacter} 
          onImport={importCharacter} 
        />
        <button onClick={saveCharacter} className="save-btn">
          Save Character
          <br/>
          <span className="save-tooltip"><h6>(Work In Progress)</h6></span>
        </button>
      </div>
    </header>
  );
};

export default Header;