import React from 'react';

interface PlayerProps {
  name: string;
}

const Player: React.FC<PlayerProps> = ({ name }) => {
  return (
    <div className='flex flex-row items-center justify-center rounded-lg bg-white p-4 gap-1'>
        <img src='/icons/Icon.png' alt='player count' className='h-4 w-4 bg-purple-200'/>
        <p className='text-black text-sm text-center'>{name}</p>
    </div>
  );
};

export default Player;