import React, { useEffect, useState } from 'react';

interface PlayerProps {
  name: string;
}

const Player: React.FC<PlayerProps> = ({ name }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a class to trigger the scale transition on mount after a delay
    const pinElement = document.getElementById('pin-element');
    if (pinElement) {
      setTimeout(() => {
        setIsVisible(true)
      }, 300);
    }
  }, []);

  return (
    <div className='flex flex-row items-center justify-center rounded-lg bg-white p-4 gap-1'>
        <img src='/icons/Icon.png' alt='player count' className='h-4 w-4 bg-purple-200'/>
        <p className='text-black text-sm text-center'>{name}</p>
    </div>
  );
};

export default Player;