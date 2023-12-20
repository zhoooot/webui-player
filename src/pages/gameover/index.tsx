
import React from 'react';
import Leaderboards  from './components/leaderboards';
import PlayerBar from './components/playerbar';

const GameOverPage: React.FC = () => {
  

  return (
    <div>
      <PlayerBar quiz_name='shut the fuk up'/>
      <Leaderboards />
    </div>
  );
};

export default GameOverPage;