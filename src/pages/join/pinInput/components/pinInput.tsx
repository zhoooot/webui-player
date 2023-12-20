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

  return (
    <div className="flex flex-col items-center p-4 bg-white mt-2 rounded-lg">
      <input
        type="text"
        value={pin}
        onChange={handlePinChange}
        placeholder="Game PIN"
        className="border border-gray-300 rounded p-2 text-lg my-1 w-full outline-black text-black"
      />
      <button 
        type="submit" 
        onClick={handleSubmit} 
        className="bg-purple-600 text-white border-none rounded p-2 text-lg w-full cursor-pointer mt-2 font-bold"
      >
        Submit
      </button>
    </div>
  );
};

export default PinInput;