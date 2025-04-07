const GenerationButton = ({ 
  onClick, 
  disabled, 
  loadingText, 
  defaultText,
  className = "generate-btn" 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {disabled ? (
        <span className="generating-text">{loadingText}</span>
      ) : (
        defaultText
      )}
    </button>
  );
};

export default GenerationButton;
