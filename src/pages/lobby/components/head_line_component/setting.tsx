import React from 'react';

interface SettingProps {
  onClick?: () => void; 
}

const Setting: React.FC<SettingProps> = ({ onClick }) => {
  return (
    <div className='flex items-center justify-center rounded-lg bg-black h-full w-full' onClick={onClick} style={{ cursor: 'pointer' }}>
        <img src='/icons/Gear.png' alt='setting' className='h-4 w-4'/>
    </div>
  );
};

export default Setting;