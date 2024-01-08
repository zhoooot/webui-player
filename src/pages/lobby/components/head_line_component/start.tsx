import React, { useEffect, useState } from 'react';

interface StartProps {
  onClick?: () => void; 
}

const Start: React.FC<StartProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      setTimeout(() => {
        setIsVisible(true)
      }, 1400);
  }, []);
  return (
    <div className={isVisible? 'transition-transform scale-100 duration-700 flex items-center justify-center rounded-lg bg-purple-600 hover:bg-purple-500 h-full w-full' : 'transform scale-[0] flex items-center justify-center rounded-lg bg-purple-600 hover:bg-purple-500 h-full w-full' }
    onClick={onClick} style={{ cursor: 'pointer' }}>
        <p className='text-white text-base text-center'>Start</p>
    </div>
  );
};

export default Start;
