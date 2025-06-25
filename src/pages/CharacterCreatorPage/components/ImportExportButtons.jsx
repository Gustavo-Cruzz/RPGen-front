// ImportExportButtons.jsx
import React, { useRef } from 'react';
import { exportToPdf } from './PdfExporter';

const ImportExportButtons = ({ onExport, onImport, character, className = "generate-btn" }) => {
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        await onImport(file);
        alert("Character imported successfully!");
      } catch (error) {
        alert("Failed to import character: " + error.message);
      }
    }
  };

  const handleExportPdf = () => {
    exportToPdf(character);
  };

  return (
    <div className="button-group">
      <button onClick={onExport} className={className}>
        Export as JSON
      </button>
      <button onClick={handleExportPdf} className={className}>
        Export as PDF
      </button>
      <button onClick={handleImportClick} className={className}>
        Import Character
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImportExportButtons;