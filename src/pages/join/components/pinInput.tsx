import React, { useState } from 'react';

interface PinInputProps {
  onSubmit: (pin: string) => void;
}

const PinInput: React.FC<PinInputProps> = ({ onSubmit }) => {
  const [pin, setPin] = useState('');

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredPin = e.target.value;
    setPin(enteredPin);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pin);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding:'8px',
    backgroundColor:'white',
  };

  const inputStyle: React.CSSProperties = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '8px',
    fontSize: '16px',
    margin: '5px 0',
    width: '100%',
    outlineColor:'black'
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    width: '100%',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        value={pin}
        onChange={handlePinChange}
        placeholder="Enter your PIN"
        style={inputStyle}
      />
      <button type="submit" onClick={handleSubmit} style={buttonStyle}>
        Submit
      </button>
    </div>
  );
};

export default PinInput;
