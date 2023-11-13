// pages/game.tsx
import React from 'react';
import PinInput from './components/pinInput';

const InputPinPage: React.FC = () => {
  const handlePinSubmit = (pin: string) => {
    // Handle the submitted PIN (e.g., check it against the correct PIN).
    console.log('Submitted PIN:', pin);

    // Add your game logic here.
  };

  return (
    <div>
      <h1>Input Pin Page</h1>
      <PinInput onSubmit={handlePinSubmit} />
    </div>
  );
};

export default InputPinPage;
