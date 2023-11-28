import React, { useState } from 'react';
import Podium from './component/Podium';
import BackButton from './component/BackButton';
import Rank4Plus from './component/Rank4Plus/Rank4Plus';

const RankingScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center w-screen justify-end h-screen bg-yellow-50 relative overflow-hidden">
      <b className='text-center p-2 absolute top-2 bg-white'>Quiz Name</b>
      <BackButton />
      <Podium />
      <Rank4Plus items={["4th","5th","6th"]} />
    </div>
  );
};

export default RankingScreen;