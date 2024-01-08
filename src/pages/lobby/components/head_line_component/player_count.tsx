import React from 'react';

interface PlayerCountProps {
  count: number;
}

const PlayerCount: React.FC<PlayerCountProps> = ({ count }) => {
  return (
    <div className='flex flex-row items-center px-4 justify-center rounded-lg bg-black h-full w-full gap-1'>
        <img src='/icons/Icon.png' alt='player count' className='h-4 w-4'/>
        <p className='text-white text-sm text-center'>100</p>
    </div>
  );
};

export default PlayerCount;