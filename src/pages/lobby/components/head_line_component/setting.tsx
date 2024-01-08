import React, { useEffect, useState } from 'react';

interface SettingProps {
  onClick?: () => void; 
}

const Setting: React.FC<SettingProps> = ({ onClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a class to trigger the scale transition on mount after a delay
      setTimeout(() => {
        setIsVisible(true)
      }, 1200);
  }, []);

  return (
    <div 
      className={isVisible? 'transition-transform scale-100 duration-700 flex items-center justify-center hover:bg-gray-800 rounded-lg bg-black h-full w-full' : 'transform scale-[0] flex items-center justify-center hover:bg-gray-800 rounded-lg bg-black h-full w-full'} 
      onClick={onClick} 
      style={{ cursor: 'pointer' }}>
        <img src='/icons/Gear.png' alt='setting' className='h-4 w-4'/>
    </div>
  );
};

export default Setting;