import React from 'react';

const TextInput = ({
  input_id,
  value,
  label,
  rows = 4,
  placeholder = '',
  onChange,
  className = 'form-group'
}) => {
  return (
    <div className={className}>
      <label htmlFor={input_id}>{label}</label>
      <textarea
        id={input_id}
        name={input_id}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;