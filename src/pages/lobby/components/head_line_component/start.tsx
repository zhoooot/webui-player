import React from 'react';

interface StartProps {
  onClick?: () => void; 
}

const Start: React.FC<StartProps> = ({ onClick }) => {
  return (
    <div className='flex items-center justify-center rounded-lg bg-purple-500 h-full w-full' onClick={onClick} style={{ cursor: 'pointer' }}>
        <p className='text-white text-base text-center'>Start</p>
    </div>
  );
};

export default Start;
