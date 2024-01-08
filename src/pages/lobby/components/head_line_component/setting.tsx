import React from 'react';
import Image0 from '/public/icons/Gear.png';
import Image from 'next/image';
interface SettingProps {
  onClick?: () => void; 
}

const Setting: React.FC<SettingProps> = ({ onClick }) => {
  return (
    <div className='flex items-center justify-center rounded-lg bg-black h-full w-full' onClick={onClick} style={{ cursor: 'pointer' }}>
        <Image src={Image0} alt='setting' width={20} height={20} className='mx-5'/>
    </div>
  );
};

export default Setting;