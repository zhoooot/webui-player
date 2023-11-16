import React, { useState } from 'react';

const RankingScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center justify-end h-screen bg-gray-200 relative overflow-hidden">
      {/* Podium for Top 3 */}
      <div className="flex items-bottom justify-between p-8">
        {/* Second Place */}
        <div className="flex flex-col items-center justify-end flex-0 p-0">
            <p>2nd Place</p>
            <img src="/icons/Rank2.png" alt="2nd Place" />
        </div>

        {/* First Place */}
        <div className="flex flex-col items-center justify-end flex-0 p-0">
            <p>1st Place</p>
            <img src="/icons/Rank1.png" alt="1st Place" />
        </div>

        {/* Third Place */}
        <div className="flex flex-col items-center justify-end flex-0 p-0">
            <p>3rd Place</p>
            <img src="/icons/Rank3.png" alt="3rd Place" />
        </div>
      </div>

      {/* Expandable Scrollable Component */}
      <div
        className={`${
          isExpanded ? 'h-64' : 'h-0'
        } w-full bg-white p-4 border-t border-gray-300 overflow-y-auto absolute bottom-0 transition-height duration-300 ease-in-out`}
      >
        <p>expandable content.</p>
      </div>

      {/* Button to Expand/Collapse */}
      <button
        className="p-2 bg-gray-600 text-white absolute bottom-4"
        onClick={handleExpandClick}
      >
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
    </div>
  );
};

export default RankingScreen;
