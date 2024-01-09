// pages/index.js
import React, { useEffect, useState } from 'react';
import Grid from './components/power_ups';
import { Socket } from 'socket.io-client';
import { Player } from '@/logic/player';
import router from 'next/router';

const Home = () => {

  

  return (
    <div className="mx-auto pt-4 pb-1 pl-4 pr-4 w-full h-screen bg-gray-100">
      <h1 className="text-2xl font-bold align-middle justify-center grid mb-4 mt-10">Choose 4 power-ups</h1>
      <Grid />
    </div>

  );
};

export default Home;