import React, { useEffect, useState } from 'react';

interface PinProps {
  pin: string;
}

const Pin: React.FC<PinProps> = ({ pin }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPinGenerated, setisPinGenerated] = useState(false);

  useEffect(() => {
    // Add a class to trigger the scale transition on mount after a delay
    const pinElement = document.getElementById('pin-element');
    if (pinElement) {
      setTimeout(() => {
        setIsVisible(true)
      }, 100);
      setTimeout(() => {
        setisPinGenerated(true)
      }, 7500);
    }
  }, []);

  return (
    <div
      id="pin-element"
      className={isVisible ? (isPinGenerated ? 
        "transform transition-all scale-100 duration-[1500ms] flex rounded-lg w-4/6 text-black justify-center h-full p-1 bg-white" : 
        "transform transition-all scale-[1.7] translate-y-[40vh] duration-[2500ms] flex bg-white rounded-lg w-4/6 h-full text-black justify-center p-1") : 
        ("transform scale-[0] translate-y-[40vh] flex rounded-lg w-4/6 justify-center p-1")
      }
    >
      <div className='flex flex-col item-start justify-center py-2'>
        <b className='text-sm font-bold'>Game PIN:</b>
        <b className='text-2xl tracking-wide font-black'> {pin}</b>
      </div>
    </div>
  );
};



export default Pin;


