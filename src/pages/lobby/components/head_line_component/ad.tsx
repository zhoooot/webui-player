import React, { useEffect, useState } from 'react';

const Ad = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

    // Add a class to trigger the scale transition on mount
    const adElement = document.getElementById('ad-element');
    if (adElement) {
      setTimeout(() => {
        setIsVisible(true)
      }, 8500);
    }
  }, []);

  return (
    <div id="ad-element" className={isVisible? "transition-transform scale-100 duration-[1500ms] bg-white rounded-lg w-4/6 h-full p-1 flex flex-col item-start justify-center text-black":"transform scale-[0] w-4/6 h-full p-1"}>
        <p className='text-base font-semibold'>Join at</p>
        <b className='text-2xl'>www.zhoot.it</b>
    </div>
  );
};

export default Ad;
