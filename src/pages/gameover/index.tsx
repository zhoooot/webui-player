
import React from 'react';
import Leaderboards  from './components/leaderboards';
import PlayerBar from './components/playerbar';

const GameOverPage: React.FC = () => {
  const name=
  // localStorage.getItem("username") || 
  "shut the fuk up";

  return (
    <div>
      <PlayerBar quiz_name={name}/>
      <Leaderboards />
    </div>
  );
};

export default GameOverPage;