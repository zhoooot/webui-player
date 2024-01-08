import React, { useEffect } from 'react';

const Ad = () => {
  useEffect(() => {
    // Add a class to trigger the scale transition on mount
    const adElement = document.getElementById('ad-element');
    if (adElement) {
      adElement.classList.add('scale-in');
    }
  }, []);

  return (
    <div
      id="ad-element"
      className="bg-white rounded-lg w-36 h-full pl-2 flex flex-col items-start justify-center text-black"
    >
      <p className='text-xs'>join at</p>
      <b className='text-sm'>www.zhoot.it</b>
    </div>
  );
};

export default Ad;
