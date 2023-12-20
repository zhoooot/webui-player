import React from 'react';

interface PlayerProps {
  quiz_name: string;
}

const PlayerBar: React.FC<PlayerProps> = ({quiz_name}) => {
  return (

      <div className='grid justify-items-center'>
        <div className="mt-4 p-3 text-2xl font-bold text-center mb-4 bg-white  rounded-2xl">{quiz_name}</div>
      </div>

  );
};

export default PlayerBar;