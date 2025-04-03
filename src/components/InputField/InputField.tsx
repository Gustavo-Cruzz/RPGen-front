import React from "react";
import "./InputField.css"; 

interface InputFieldProps {
  input_text: string;
  //   user_input: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Optional onChange handler
}

const InputField: React.FC<InputFieldProps> = ({ input_text, onChange }) => {
  return (
    <div className="input-container">
        <label htmlFor="name" className="input-label">
            Characters's {input_text}:
        </label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder={input_text}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
};

export default InputField;
