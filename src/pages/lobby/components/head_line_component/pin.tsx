import React, { useEffect, useState } from 'react';

interface PinProps {
  pin: string;
}

const Pin: React.FC<PinProps> = ({ pin }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a class to trigger the scale transition on mount after a delay
    const pinElement = document.getElementById('pin-element');
    if (pinElement) {
      setTimeout(() => {
        setIsVisible(true)
      }, 700);
    }
  }, []);

  return (
    <div
      id="pin-element"
      className={isVisible? "bg-white transition-transform scale-100 duration-[1500ms] rounded-lg w-4/6 text-black justify-center flex" : "transform scale-[0] p-4"}
    >
      <div className='flex flex-col item-start justify-center py-2'>
        <b className='text-sm font-bold'>Game PIN:</b>
        <b className='text-4xl tracking-wide font-black'> {pin}</b>
      </div>
    </div>
  );
};



export default Pin;


