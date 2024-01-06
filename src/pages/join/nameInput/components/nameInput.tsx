import Router from 'next/router';
import React, { useState } from 'react';

interface NameInputProps {
  onSubmit: (pin: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = e.target.value;
    setName(enteredName);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white mt-2 rounded-lg">
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Nickname"
        className="border border-gray-300 rounded p-2 text-lg my-1 w-full outline-black text-black"
      />
      <button 
        type="submit" 
        onClick={handleSubmit} 
        className="bg-purple-600 text-white border-none rounded p-2 text-lg w-full cursor-pointer mt-2 font-bold"
      >
        Ok, go!
      </button>
    </div>
  );
};

export default NameInput;