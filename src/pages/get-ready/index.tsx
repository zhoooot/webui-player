// pages/index.js
import React from 'react';
import Loading from './components/loading';
import {Player} from '../../logic/player';
import router from "next/router";

const Home: React.FC = () => {

  Player.client.socketClient.on('start', (message: any) => {
    router.push('../gameblock')
  })

  return (
    <div className="mx-auto  w-screen h-screen bg-gray-100">
      <Loading name='shut the fuk up' point={2222} index={1}/>
        </div>
  );
};

export default Home;