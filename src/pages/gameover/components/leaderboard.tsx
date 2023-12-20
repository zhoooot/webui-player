import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Image component

interface ChampionshipItemProps {
  name: string;
  score: number;
  position: number;
  questions: number;
  correct: number;
}

import Image0 from '/public/images/badges/0.png';
import Image1 from '/public/images/badges/1.png';
import Image2 from '/public/images/badges/2.png';

const ChampionshipItem: React.FC<ChampionshipItemProps> = ({
  name,
  score,
  position,
  questions,
  correct,
}) => {
  const margin = position === 0 ? 5 : position === 1 ? 10 : 15;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, position * 1000);
    return () => clearTimeout(timer);
  }, [position]);

  const imageUrls = [Image0, Image1, Image2];
  return (
    <div className={`h-screen w-44 flex-col flex ${isVisible ? 'animate-popIn duration-1000 ease-in-out' : 'scale-0'}`}>
      <div style={{ marginTop: `${margin}rem`}} className='flex-none text-2xl font-bold text-center mb-4 bg-white p-2 rounded-2xl'>{name}</div>
      <div style={{ zIndex: position === 0 ? 1 : 0 }} className={`flex-col flex w-44 h-full items-center  pt-4 bg-gray-300 rounded-t-lg ${position === 0 ? 'shadow-lg shadow-black' : ''}`}>
        <Image src={imageUrls[position]} alt='leaderboard' className='object-scale-down h-24 w-24' />
        <div className='mt-2 flex-none text-lg font-bold text-center'>{score}</div>
        <div className='flex-none text-base font-bold text-center'>{correct} out of {questions}</div>
      </div>
    </div>
  );
};

export default ChampionshipItem;


