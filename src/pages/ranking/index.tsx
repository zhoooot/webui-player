import React, { useState } from 'react';

const RankingScreen = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center justify-end h-screen bg-yellow-50 relative overflow-hidden">
      {/* Podium for Top 3 */}
      <div className="flex items-bottom justify-between p-8 h-full">
        {/* Second Place */}
        <div className="flex flex-col items-center justify-end flex-0 p-0">
          <div className='mb-8'>2nd Place</div>
          <img src="/icons/Rank2.png" alt="2nd Place" />
        </div>

        {/* First Place */}
        <div className="flex flex-col items-center justify-end flex-0 p-0">
          <img className='mb-10' src='/icons/Medal.png'></img>
          <p className='mb-8'>1st Place</p>
          <img src="/icons/Rank1.png" alt="1st Place" />
        </div>

        {/* Third Place */}
        <div className="flex flex-col items-center justify-end flex-0 p-0">
          <p className='mb-8'>3rd Place</p>
          <img src="/icons/Rank3.png" alt="3rd Place" />
        </div>
      </div>

      {/* Expandable Scrollable Component */}
      <div
        className={`${
          isExpanded ? 'h-full' : 'h-13'
        } w-full bg-contain bg-cover bg-no-repeat p-4 pt-0 border-t border-gray-300 overflow-y-auto absolute bottom-0 transition-height duration-300 ease-in-out flex flex-col items-center justify-start`}
        style={{ backgroundImage: `url('/icons/RankingBase.png')` }}
      >
        {/* Button to Expand/Collapse */}
        <button
          className={`p-2 bg-gray-600 text-white self-center mt-2 mb-3 opacity-0`}
          onClick={handleExpandClick}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
        <p>expandable content.</p>
      </div>
      <div className="fixed top-0 left-0 p-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Go Back</button>
      </div>

    </div>
  );
};

export default RankingScreen;

