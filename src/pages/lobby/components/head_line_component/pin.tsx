import React from 'react';

interface PinProps {
  pin: string;
}

const Pin: React.FC<PinProps> = ({ pin }) => {
  return (
    <div className="bg-white rounded-lg w-4/6 text-black justify-center flex">
      <div className='flex flex-col item-start justify-center py-2'>
        <b className='text-sm font-bold'>Game PIN:</b>
        <b className='text-4xl tracking-wide font-black'> {pin}</b>
      </div>
    </div>
  );
};

export default Pin;
