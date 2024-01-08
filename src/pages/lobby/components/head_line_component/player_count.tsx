import React, { useEffect, useState } from 'react';

interface PlayerCountProps {
  count: number;
}

const PlayerCount: React.FC<PlayerCountProps> = ({ count }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a class to trigger the scale transition on mount after a delay
      setTimeout(() => {
        setIsVisible(true)
      }, 1000);
  }, []);

  return (
    <div className={isVisible? 'transition-transform scale-100 duration-700 flex flex-row items-center px-4 justify-center rounded-lg bg-black h-full w-full gap-1' : 'transform scale-[0] flex flex-row items-center justify-center rounded-lg bg-black h-full w-full gap-1'}>
        <img src='/icons/Icon.png' alt='player count' className='h-4 w-4'/>
        <p className='text-white text-sm text-center'>{count}</p>
    </div>
  );
};



export default PlayerCount;