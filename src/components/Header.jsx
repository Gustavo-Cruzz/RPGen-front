import React from 'react';
import { useTheme } from '../hooks/ThemeContext';

const Header = ({ saveCharacter }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <h1>D&D 5E Character Sheet</h1>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button onClick={saveCharacter} className="save-btn">
          Save Character
          <br/>
          <span className="save-tooltip"><h6>(Work In Progress)</h6></span>
        </button>

        <button onClick={toggleTheme} className="save-btn" style={{ padding: '10px' }}>
          {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
        </button>
      </div>
    </header>
  );
};

export default Header;
