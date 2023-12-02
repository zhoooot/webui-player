import React from 'react';
import { useRouter } from 'next/router';
import Pin from './components/head_line_component/pin';
import Ad from './components/head_line_component/ad';
import Start from './components/head_line_component/start';
import PlayerCount from './components/head_line_component/player_count';
import Setting from './components/head_line_component/setting';
import Player from './components/body_component/player';

const Lobby = () => {
  const router = useRouter();

  const handleStart = () => {
    router.push('../gameblock');
  };

  return (
    <div className='bg-yellow-100 flex flex-col h-screen justify-start items-center'>
      {/* Headline*/}
      <div className='flex flex-row justify-between items-center gap-2'>
        <Ad/>
        <Pin pin={123456}/>
        <div className='flex flex-col items-center justify-between h-full w-36 gap-3'>
          <div className='flex flex-row justify-between h-full w-full gap-2'>
            <PlayerCount count={0}/>
            <Setting onClick={() => {}}/>
          </div>
          <Start onClick={handleStart}/>
        </div>
      </div>

      {/* Body */}
      <div className='flex flex-wrap p-4 gap-3 justify-center items-start bg-gray-500 mt-10 w-11/12'>
        <Player name='Player 14444444444444'/>
        <Player name='Player 1333333333333'/>
        <Player name='Player 122222222222222'/>
        <Player name='Player 1111111111111111111'/>
        <Player name='Player 555555555555555'/>
        <Player name='Player 556666666666'/>
        <Player name='Player 556666666666'/>
        
      </div>
    </div>
  );
};

export default Lobby;