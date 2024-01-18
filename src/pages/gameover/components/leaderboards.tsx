import React, { useState, useEffect } from 'react';
import ChampionshipItem from './leaderboard';
import ChampionshipItem1 from './leaderboard1';
import { GameOverProps, User } from '@/pages/gameover/index';


const Leaderboards: React.FC<GameOverProps> = (props: {users: User[]}) => {
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
        <ChampionshipItem name={props.users[1].name} score={props.users[1].score} position={1} questions={10} correct={9} />
        <ChampionshipItem name={props.users[0].name} score={props.users[0].score} position={0} questions={10} correct={10} />
        <ChampionshipItem name={props.users[2].name} score={props.users[2].score} position={2} questions={10} correct={8} />
      </div>
      {isVisible && (
        <div className='grid justify-items-center '>
          <div className='inline-flex flex-row justify-center items-center bg-gray-400 p-2 rounded-lg absolute bottom-0 z-10 mb-4'>
            <ChampionshipItem1 name={props.users[3].name} position={4}/>
            <ChampionshipItem1 name={props.users[4].name} position={5} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboards;