import React from 'react';

const SimpleInput = ({
  type = 'text',
  input_id,
  value,
  label,
  placeholder = '',
  className = 'form-group',
  onChange
}) => {
  return (
    <div className={className}>
      <label htmlFor={input_id}>{label}</label>
      <input
        id={input_id}
        name={input_id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SimpleInput;