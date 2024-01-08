import React from 'react';
import Image from 'next/image';
import Image0 from '/public/icons/Icon.png';

interface PlayerProps {
  name: string;
  onClick?: () => void;
}

const Player: React.FC<PlayerProps> = ({ name, onClick }) => {
  return (
    <div className='w-fit mx-5 rounded-lg bg-white' onClick={onClick}>
      <div className='flex flex-row justify-center items-center'>
        <Image src={Image0} alt='player count' className='bg-purple-200 rounded-tl-lg rounded-bl-lg' width={40} height={40} />
        <p className='text-black font-bold text-lg flex-1 px-2 hover:line-through hover:cursor-default'>{name}</p>
      </div>
    </div>
  );
};

export default Player;