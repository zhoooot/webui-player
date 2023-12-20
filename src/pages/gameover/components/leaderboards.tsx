import React, { useState, useEffect } from 'react';
import ChampionshipItem from './leaderboard';
import ChampionshipItem1 from './leaderboard1';

const Leaderboards = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000); // Change this to the desired delay in milliseconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className="flex justify-center z-0" >
        <ChampionshipItem name={'fuk off'} score={100} position={1} questions={10} correct={9} />
        <ChampionshipItem name={'fuk off'} score={100} position={0} questions={10} correct={10} />
        <ChampionshipItem name={'fuk off'} score={100} position={2} questions={10} correct={8} />
      </div>
      {isVisible && (
        <div className='grid justify-items-center '>
          <div className='inline-flex flex-row justify-center items-center bg-gray-400 p-2 rounded-lg absolute bottom-0 z-10 mb-4'>
            <ChampionshipItem1 name={'fuk off'} position={4}/>
            <ChampionshipItem1 name={'fuk off'} position={5} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboards;