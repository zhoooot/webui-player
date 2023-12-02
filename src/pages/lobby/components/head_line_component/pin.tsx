import React from 'react';

interface PinProps {
  pin: number;
}

const Pin: React.FC<PinProps> = ({ pin }) => {
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col item-start justify-center">
        <b className='text-xs'>Game PIN:</b>
        <b className='text-3xl tracking-wider'> {pin}</b>
    </div>
  );
};

export default Pin;
