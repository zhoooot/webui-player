import React, { useState } from 'react';
import Podium from './component/Podium';

const RankingScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center w-screen justify-end h-screen bg-yellow-50 relative overflow-hidden">
      <Podium />
    </div>
  );
};

export default RankingScreen;