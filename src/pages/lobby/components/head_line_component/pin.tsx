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
      className={isVisible? "bg-white transition-transform scale-100 duration-[1500ms] rounded-lg p-4 flex flex-col h-full items-start justify-center text-black" : "transform scale-[0] p-4"}
    >
      <b className='text-xs'>Game PIN:</b>
      <b className='text-3xl'> {pin}</b>
    </div>
  );
};

export default Pin;


