
import React from 'react';
import Leaderboards  from './components/leaderboards';
import PlayerBar from './components/playerbar';

export interface User{
  name: string,
  score: number
}

export interface GameOverProps {
  users: User[];
}

const GameOverPage: React.FC<GameOverProps> = (users) => {
  const name=
  // localStorage.getItem("username") || 
  "shut the fuk up";

  return (
    <div>
      {/* <PlayerBar quiz_name={name}/> */}
      <Leaderboards users={users.users}/>
    </div>
  );
};

export default GameOverPage;