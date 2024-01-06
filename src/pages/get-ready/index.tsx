// pages/index.js
import React from 'react';
import Loading from './components/loading';
import {Player} from '../../logic/player';
import router from "next/router";
import { ClientPlayer } from '@/logic/client-player';

const Home: React.FC = () => {

  Player.getPlayerClient().socketClient.on('start', (message: any) => {
    router.replace('../gameblock/player')
  })
  const name=localStorage.getItem("username") || "shut the fuk up";
  return (
    <div className="mx-auto  w-screen h-screen bg-gray-100">
      <Loading name={name} point={2222} index={1}/>
        </div>
  );
};

export default Home;