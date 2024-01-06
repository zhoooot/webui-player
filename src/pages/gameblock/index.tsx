import React from 'react';
import Player from './player';
import Host from './host';

const GameBlock: React.FC = () => {
  const role = 
  // localStorage.getItem('role') || 
  'user';

  return (
    <>
      {role === 'user' ? <Player /> : role === 'host' ? <Host /> : null}
    </>
  );
};

export default GameBlock;