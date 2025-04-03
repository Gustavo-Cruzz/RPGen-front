import React from "react";
import "./ImageField.css";

interface GenerateImageButtonProps {
  onClick: () => void;
}

const GenerateImageButton: React.FC<GenerateImageButtonProps> = ({
  onClick,
}) => {
  return (
    <button onClick={onClick} className="image-preview">
      <label>Generate Image</label>
    </button>
  );
};

export default GenerateImageButton;
